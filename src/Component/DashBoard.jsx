// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payLoads = token.split(".")[1];
      const decode = JSON.parse(atob(payLoads));
      setUserName(decode.userName);
    }
  }, []);

  const navigate = useNavigate();
  const handleOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Welcome, {userName}
        </h1>
        <button
          onClick={handleOut}
          className="w-full py-2 mt-4 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
