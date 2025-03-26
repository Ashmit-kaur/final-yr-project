import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Signin from "../Components/Auth/Signin";
import Signup from "../Components/Auth/Signup";
import ForgetPassword from "../Components/Auth/ForgetPassword";
import VerifyAccount from "../Components/Auth/VerifyAccount";
import Homepage from "../pages/Home/Homepage";
import Demopage from "../pages/Demo/Demopage";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <div className="m-0 p-0 bg-gray-800">
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/demo" element={<Demopage />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/verify-account" element={<VerifyAccount />} />
          <Route exact path="/forget-password" element={<ForgetPassword />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routing;
