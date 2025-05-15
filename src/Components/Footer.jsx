import { FaGithub } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[rgb(119,93,168)] py-10 text-white">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Link
          to=""
          className="text-2xl hover:text-gray-200 transition duration-200"
        >
          <FaGithub />
        </Link>
        <p className="text-lg font-semibold">GimmeFeedbacks</p>
        <p className="text-sm text-gray-100">&copy; 2025 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
