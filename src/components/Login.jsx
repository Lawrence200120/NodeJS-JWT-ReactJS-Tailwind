import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", { username, password });
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      navigate("/notes");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Username */}
          <div>
            <label htmlFor="username" className="text-gray-600 font-medium">Username*</label>
            <input
              id="username"
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-gray-600 font-medium">Password*</label>
            <input
              id="password"
              type={pass ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Show Password */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="checkbox1"
              onChange={() => setPass(!pass)}
              className="h-4 w-4"
            />
            <label htmlFor="checkbox1" className="text-gray-600">Show password</label>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
            Login
          </button>

          {/* Divider */}
          <p className="text-center text-gray-500">OR</p>

          {/* Signup Button */}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full border border-blue-600 text-blue-600 py-2 rounded-md font-semibold hover:bg-blue-50 transition">
            Signup
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
