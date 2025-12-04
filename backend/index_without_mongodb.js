const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

//Port number and secret key for JWT authentication
const PORT = 5000;
const SECRET_KEY = "abcdef";

// Mock user data (in-memory) for JWT authentication for registere user stored to n this array
const users = [];
const app = express();


//socket configuration
//create server 
const server = http.createServer(app);
//Insert socket server to server
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header
    credentials: true
  }
});

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header
  credentials: true
}));

app.use(bodyParser.json()); // bodyParser is the middle ware for JWT authentication


app.get('/', (req,res)=>{
  res.send("Hello ! Server is running on 5000");
})

//Registration endpoint
app.post("/register", async (req, res) => {
  try{
      const { username, password } = req.body;

      //Enter username and password
         if (!username || !password) {
               return res.status(400).json({ message: "Username and password are required" });
         }

         //Checking if user is already exists or not
         const existingUser = users.find((user) => user.username === username);
         if (existingUser) {
              return res.status(409).json({ message: "User already exists" });
         }

      //bcrypt the password for security purpose
      const hashedPassword = await bcrypt.hash(password, 10);
      //Push the registered user details to users array
      users.push({username,password:hashedPassword });
      res.status(201).json({ message: "User registered successfully" });
  }
  catch(error){
    //Error Handling
      res.status(500).send("Error created user")
  }
});

//Login endpoint
app.post("/login", async (req, res) => {
  try{
    const { username, password } = req.body;
  
    //User not found
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
  
    //Invalid Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }
  
    //Generate JWT token for registered user when logging in
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token });
  }
  catch(e){
      res.status(500).send("Error Logging In")
  }
  });


  //VerifyJWTToken when user logging in 
  const verifyToken =(req,res,next)=>{
      const token = req.headers.authorization;
      if(!token) return res.status(401).send("Request Denied");
      try{
          const verified = jwt.verify(token,SECRET_KEY);
          req.user = verified;
          next();
      }
      catch(error){
        res.status(400).send("Invalid Token");
      }
  }

  //JWT token is verifies
  app.get("/profile",verifyToken,(req,res)=>{
    res.send(`Welcome ${req.user.username}`)
  })


//Task 2============================================================//
//Initial productList
let productList = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 }
];

// Endpoint to get product list via HTTP
app.get('/products', (req, res) => {
  res.json(productList);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit the current product list to the newly connected client
  socket.emit('productList', productList);

  // Listen for addProduct event from the client
  socket.on('addProduct', (newProduct) => {
    productList.unshift(newProduct);
    // Emit the updated product list to all connected clients
    io.emit('productList', productList);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
