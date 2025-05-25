import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Signin from "../Components/Auth/Signin";
import Signup from "../Components/Auth/Signup";
import ForgetPassword from "../Components/Auth/ForgetPassword";
import VerifyAccount from "../Components/Auth/VerifyAccount";
import Homepage from "../pages/Home/Homepage";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "../layout/MainLayout";
import { AuthContext } from "../contexts/Authcontext";
import Review from "../pages/Review/Review";
import ManageTestimonials from "../Components/Testimonials/ManageTestimonials";
import Testimonial from "../Components/Testimonials/Testimonial";

const Routing = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route exact path="/" element={<Homepage />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />
            }
          />
           <Route
            path="/dashboard/managetestimonials/:slug"
            element={
              isAuthenticated ? <ManageTestimonials /> : <Navigate to="/signin" />
            }
          />
        </Route>
        <Route
          path="/products/:slug"
          element={
            <Review/>
          }
        />

        <Route path="/share/:id" element={<Testimonial/>}/>

        <Route element={<AuthLayout />}>
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
            }
          />
          <Route
            path="/signin"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Signin />
            }
          />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>

        <Route
          path="/*"
          element={<div className="bg-white text-black">Not Found</div>}
        />
      </Routes>
  );
};

export default Routing;
