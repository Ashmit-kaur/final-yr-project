import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout"
import Signin from "../Components/Auth/Signin";
import Signup from "../Components/Auth/Signup";
import ForgetPassword from "../Components/Auth/ForgetPassword";
import VerifyAccount from "../Components/Auth/VerifyAccount";
import Footer from "../Components/Footer";
import Homepage from "../pages/Home/Homepage";
import Demopage from "../pages/Demo/Demopage";
import Navbar from "../Components/Navbar";

const MainLayout=()=>(
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
)

const Routing = () => {
  return (
    <Routes>
    {/* Main page route */}
      <Route element={<MainLayout/>}>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/demo" element={<Demopage/>}/>
      </Route>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin/>} />
        <Route exact path="/verify-account" element={<VerifyAccount />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
      </Route>
    </Routes>
  );
};

export default Routing;
