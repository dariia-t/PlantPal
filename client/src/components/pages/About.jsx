import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function About() { //log in to the app and go straight to the about page
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("auth_token"); 
    if (!token) {
      navigate("/login");  
    } else {
      setIsAuthenticated(true); 
    }
  }, [navigate]); 

  //about page lists basic information, our names, etc
  return isAuthenticated ? (
    <div className="flex flex-col items-center h-screen w-screen bg-gradient-to-br from-pink-200 via-emerald-100 to-blue-200 p-6">
      <h2 className="text-3xl font-bold text-center text-pink-400 mt-10">
        About PlantPal
      </h2>
      <p className="text-center text-lg text-gray-700 mt-4">
        Welcome to PlantPal! Here, you can track the health of your plants, make sure they are watered regularly, and get tips to keep them thriving.
      </p>
      <h2 className="text-3xl font-bold text-center text-blue-400 mt-10">
        🪴 The Creators 🪴
      </h2>
      <p className="text-center text-lg text-gray-700 mt-4">
        Layan Suleiman <br />
        Dariia Tyshchenko <br />
        Sarah Zwart
      </p>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-pink-200 via-emerald-100 to-blue-200">
      <p className="text-lg text-gray-700">Redirecting to Login...</p>
    </div>
  );
}
