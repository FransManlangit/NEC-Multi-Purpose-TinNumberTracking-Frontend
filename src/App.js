import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ProtectedRoute from "./components/Route/ProtectedRoute";


//Pages
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Navbar/Sidebar";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Profile from "./pages/Profile/Profile";
import MemberList from "./pages/Member/MemberList";
import EditMember from "./pages/Member/EditMember";

import { loadUser } from "./actions/userActions";
import store from "./store";

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <PrimeReactProvider>
    <div className="flex flex-col h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/memberlist" element={<MemberList />} />
        <Route path="/employee/member/:id" element={<EditMember />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  </PrimeReactProvider>
  );
}
