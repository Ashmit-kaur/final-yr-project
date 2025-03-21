import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setformData] = useState(initialValues);
  const [error, setError] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [showpass, setshowpass] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== confirmpass) {
        setError("Password and confirm password didn't match.");
      } else {
        setError("");
        const result = await axios.post(
          "http://localhost:3000/api/v1/auth/signup",
          formData
        );
        setError("");
        alert(result.data.message);
        navigate("/verify-account");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <p className="text-3xl font-bold text-center text-purple-600 mb-6">
          Registration | Developer
        </p>
        <p className="font-medium">Please register with your details</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="developer"
              className="mt-1 block w-full border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="developer@gmail.com"
              className="mt-1 block w-full border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type={showpass ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Abc#123"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {/* <span
              className=" cursor-pointer text-gray-600"
              onClick={() => setshowpass((prev) => !prev)}
            >
              <i
                className={`fa ${showpass ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
              ></i>
            </span> */}
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmpass"
              className="block text-sm font-medium text-black"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Abc#123"
              name="confirmpass"
              id="confirmpass"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={confirmpass}
              onChange={(e) => setConfirmpass(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 "
            >
              Register
            </button>
          </div>
        </form>

        {/* Link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signin" className="text-indigo-600 hover:text-indigo-500">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
