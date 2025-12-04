import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [mobileno, setMobilenumber] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmpassword) {
        await axios.post("http://localhost:5000/register", {
          username,
          password,
          mobileno,
        });
        alert("Registration successful");
        navigate("/");
      } else {
        alert("Password Mismatch");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          
          <div>
            <label className="block font-medium mb-1">Username*</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mobile Number*</label>
            <input
              type="text"
              pattern="[2346789][0-9]{9}"
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              value={mobileno}
              onChange={(e) => setMobilenumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password*</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Confirm Password*</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Register
          </button>

          <div className="text-center">
            <p className="text-gray-500">OR</p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded"
          >
            Go to Login Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;