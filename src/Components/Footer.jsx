// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-10">
//       <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Logo & Description */}
//         <div>
//           <h2 className="text-2xl font-bold text-white">Testimonials.io</h2>
//           <p className="mt-2 text-gray-400">
//             Empowering businesses with authentic customer feedback.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold text-white">Quick Links</h3>
//           <ul className="mt-2 space-y-2">
//             <li><a href="#" className="hover:text-white">Home</a></li>
//             <li><a href="#" className="hover:text-white">Testimonials</a></li>
//             <li><a href="#" className="hover:text-white">Pricing</a></li>
//             <li><a href="#" className="hover:text-white">Contact</a></li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h3 className="text-lg font-semibold text-white">Follow Us</h3>
//           <div className="flex space-x-4 mt-3">
//             <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
//             <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
//             <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
//             <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn size={20} /></a>
//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="text-center mt-8 text-gray-500 text-sm">
//         © {new Date().getFullYear()} Testimonials.io - All Rights Reserved
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-10 bg-gray-800 text-gray-400 py-6 text-center border-t border-gray-700">
      <strong style={{ color: '#775DA8' }}>Testimonials</strong>
      <div className="mt-2">2023 © All rights reserved</div>
    </footer>
  );
};

export default Footer;
