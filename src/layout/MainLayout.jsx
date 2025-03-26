import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] p-6">
        <div className="w-full p-6 rounded-2xl shadow-lg">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
