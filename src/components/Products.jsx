import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import axios from "axios";
import { BiStopwatch } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";


const ENDPOINT = 'http://localhost:5000';

const App = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: '' });
  const navigate=useNavigate();

  //Socket connection to reactjs
  useEffect(() => {
    const fetchProtected = async () => {
        try {
    const socket = socketIOClient(ENDPOINT);

    // Listen for productList event from the server
    socket.on('productList', (updatedProductList) => {
      setProducts(updatedProductList);
    });

    //Validating JWT token in Profile page
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/profile", {
      headers: { Authorization:  `${token}` },
    });
    // if (!response.ok) {
    //     throw new Error('Network response was not ok');
    // }
    console.log(response)
    setMessage(response?.data);

    // Fetch initial product list via HTTP
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        // Ensure products have unique IDs
        const uniqueProducts = data.filter((product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
        );
        setProducts(uniqueProducts);
      });

    return () => {
      socket.disconnect();
    };
    } catch (error) {
        setMessage("Access denied. Please login.");
    }
};
    fetchProtected();
}, []);


  const handleLogout = () => {
    navigate('/register')
  };

  const handleAddProduct = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit('addProduct', newProduct);
    setNewProduct({ id: '', name: '', price: '' });
  };

  return (
    <div>
        <div>
        <nav className="d-flex align-items-center justify-content-between bg-blue-600 p-4 shadow-md">
            <div className="flex items-center space-x-2">         
                <span className="text-white text-xl font-semibold"><h1>Products Dashboard</h1></span>
            </div>
            <div className="user-info">
                <div className="user-cont">
                    <span className="user-name" onClick={handleLogout}>U</span>
                    <span className='user-det'>{message}</span>
                </div>
            </div>
        </nav>
        </div>
         <div className="form-sec mb-5">
            <div className="form-container">               
                 <div className="heder">
                    <div className="text-center head-title pt-5">
                        <h1>Products</h1>
                    </div>
                   <div className="input">              
                        <input
                            type="text"
                            placeholder="ID"
                            value={newProduct.id}
                            onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                        />
                    </div>    
                    <div className="input">              
                        <input
                            type="text"
                            placeholder="Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                    </div>    
                    <div className="input">
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                    </div>   
                    <div className="btn-subt pt-3 pb-3">
                        <button onClick={handleAddProduct}>Add Product</button>
                    </div>       
                </div>        
               
            </div>  
      
      <ul>
        
            <div class="container pt-5">
                <h1>Product List</h1>    
                <div className="product-list">    
                    
                {products.map((product) => (
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="product-card mb-2 mx-2" key={product.id}>
                            <div className='dash-card-icon fs-3'>
                                <BiStopwatch />
                            </div>
                            <div className='dash-card-cnt'>
                                <h5>{product.name}</h5>
                                <h4>${product.price}</h4>
                            </div>
                        </div>
                    </div>
        ))}
        </div>     

          </div>     
      </ul>
       
     
    </div>
    </div>
  );
};

export default App;
