# NodeJS JWT Authentication with ReactJS & Tailwind CSS

A full-stack web application demonstrating **JWT authentication** using **Node.js (Express)** for the backend and **ReactJS** for the frontend, styled with **Tailwind CSS**.

---

## **Features**

- User registration and login using **JWT tokens**.
- Protected routes on both frontend and backend.
- Password hashing with **bcrypt**.
- Token-based authentication with **JWT**.
- Responsive and modern UI with **Tailwind CSS**.
- Full CRUD support for user-related operations (optional to extend).

---

## **Technologies Used**

**Backend:**

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcrypt.js
- MongoDB / Mongoose (if used)
- dotenv for environment variables

**Frontend:**

- ReactJS
- Tailwind CSS
- Axios for API requests
- React Router DOM for routing

---

## **Project Structure**

NodeJS-JWT-ReactJS-Tailwind/

├─ backend/ # Node.js + Express backend

│ ├─ node*modules/

│ ├─ package-lock.json/

│ ├─ package.json/

│ ├─ index.js

├─ frontend/ # ReactJS frontend

        │- src/

                |- _test_

                |- assets

                |- components

│ ├─ public/

│ ├─ package.json

├─ .gitignore

└─ README.md

---

## **Getting Started**

### **1. Clone the repository**

Open terminal

git clone https://github.com/nithiyasoftwareengineer17-svg/NodeJS-JWT-ReactJS-Tailwind.git

cd NodeJS-JWT-ReactJS-Tailwind

### **2. Backend setup**

cd backend

npm install

PORT=5000

MONGO_URI=mongodb://localhost:27017/NodeJs_CRUD

JWT_SECRET=abcdef

Start the backend server: node index.js

### **2. Frondend setup**

cd../

npm install

Start the Frond End Application : npm run dev

Frondend Port : http://localhost:5173/

### **3. Usage**

Register a new user from the registration page.

Login using registered credentials.

Access protected routes (only visible to authenticated users).

JWT is stored locally and used for authorization in API requests.

Once Logged in the user then user can able to see Notes with (Add/Delete/Update)

### **4. Dependencies**

##Backend

express

bcryptjs

jsonwebtoken

mongoose

dotenv

nodemon (for development)

##Frontend

react

react-dom

react-router-dom

axios

tailwindcss version 3

### **5. MongoDB Configuration**

Local MongoDB:

Install MongoDB on your system.

Run the MongoDB server (mongod).(Please test your mongoDb connection is stable or not: open MongoDB Shell)

Use a connection string like:

MONGO_URI=mongodb://127.0.0.1:27017/NodeJs_CRUD

There are 2 collections are created : users for Login page and notes for Note page

### **6. Test case - Jest**

Command for test case running : npm test

Added test case for Login page (Login.test.jsx) under _test_  folder

### **7. Documentation done**

### **8. Please import notes.json and users.josn to MongoDB before run the application**