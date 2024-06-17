"use client"

import React, { useState } from "react";
import Sidebar from "@/components/home/Sidebar";
import Index from "@/components/course/Index";
import Login from "@/components/routes/auth/Login";

const Main: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  
  return (
    <div className="flex">
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Sidebar />
          <Index />
        </>
      )}
    </div>
  );
};

export default Main;
