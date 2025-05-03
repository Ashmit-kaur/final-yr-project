import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmpass) {
      setError("Password and confirmPassword don't match");
      return;
    }
    try {
      setloading(true);
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/updatepassword`,
        {
            email,
            newpassword:password,
        }
      );
      console.log(result.data.message);
      navigate("/login")
    } catch (error) {
      console.log(error.message);
      console.log(
        error?.response?.data?.message ||
          "Something went wrong.Please try again later"
      );
    }
    setloading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <p className="text-2xl font-bold text-center text-purple-600 mb-6">
          Forgot Password | Developer
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Abc#123"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Abc#123"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Confirm new Password
            </label>
            <input
              type="confirmpassword"
              placeholder="Abc#123"
              id="confirmpassword"
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
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Setting new password" : "Set password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
