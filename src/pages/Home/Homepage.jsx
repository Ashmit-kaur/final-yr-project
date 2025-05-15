import React from "react";
import GimmeFeed from "../../assets/GimmeFeed.png";

const Homepage = () => {
  return (
    <section className="mb-4 ">
      <img
        src={GimmeFeed}
        alt="Gimme Feedbacks Demo"
        className="w-full object-cover max-h-[500px]"
      />

      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Welcome to Gimme Feedbacks
          </h2>
        </div>

        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row items-center p-8 gap-10">
          {/* Left Side - Text + Button */}
          <div className="flex-1 text-left">
            <p className="text-gray-800 text-lg leading-relaxed">
              <span className="bg-gray-900 text-white px-2 py-1 rounded font-medium">
                Gimme Feedbacks
              </span>{" "}
              is an
              <span className="font-semibold text-black">
                {" "}
                innovative and cutting-edge
              </span>{" "}
              web application that revolutionizes the way developers incorporate
              Feedbacks into their projects. With a
              <span className="font-medium text-black">
                {" "}
                sleek and user-friendly interface
              </span>
              , Gimme Feedbacks aims to simplify the process of integrating
              robust commenting functionality into websites, applications, and
              other software projects. This{" "}
              <span className="font-semibold text-black">
                powerful and scalable Feedbacks server
              </span>{" "}
              is designed to enhance collaboration, feedback gathering, and
              engagement among developers and users.
            </p>
            <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md mt-6">
              Get Started
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1">
            <img
              src={GimmeFeed}
              alt="Gimme Feedbacks Demo"
              className="rounded-xl shadow-lg w-full object-cover max-h-[500px]"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Homepage;
