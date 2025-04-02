import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Signin from "../Components/Auth/Signin";
import Signup from "../Components/Auth/Signup";
import ForgetPassword from "../Components/Auth/ForgetPassword";
import VerifyAccount from "../Components/Auth/VerifyAccount";
import Homepage from "../pages/Home/Homepage";
import Demopage from "../pages/Demo/Demopage";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { AuthContext } from "../contexts/Authcontext";

const Routing = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated)

  return (
    <div className="m-0 p-0 bg-gray-800">
      <Routes>
        <Route element={<MainLayout />}>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/demo" element={<Demopage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
        </Route>


        <Route element={<AuthLayout />}>
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/signin" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signin />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>

        <Route path="/*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
};

export default Routing;
