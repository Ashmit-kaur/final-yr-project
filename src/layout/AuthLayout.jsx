import React from "react";
import { Outlet } from "react-router-dom";
import authimg from "../assets/authimg.png"

const Layout = () => {
  return (
    <>
      <div className="h-[100vh]  m-0 p-0 md:flex ">
        <img src={authimg} className="h-[100%] w-[50%] hidden md:flex object-cover" alt="Authlayoutimage" />
        <div className="w-[50%]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
