import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          userName,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, {
        userName,
        password,
      });
      setMessage("Registration successful! Please log in.");
      setIsRegistering(false); 
    } catch (error) {
      setMessage(
        "Registration failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {isRegistering ? "Register" : "Login"}
        </h2>
        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        <p className="text-center mt-4 text-gray-600">
          {isRegistering
            ? "Already have an account?"
            : "Don’t have an account?"}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-pink-500 ml-2 underline"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
