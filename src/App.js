import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ProtectedRoute from "./components/Route/ProtectedRoute";
//Pages
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Navbar/Sidebar";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Profile from "./pages/Profile/Profile";



import { loadUser } from "./actions/userActions";
import store from "./store";

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
 
    </div>
  );
}
