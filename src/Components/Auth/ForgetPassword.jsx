import { useState } from "react";
import React from "react";

const ForgetPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmpass,setConfirmpass]=useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "user@example.com" && password === "password123") {
      alert("Sign in successful!");
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <p className="text-2xl font-bold text-center text-purple-600 mb-6">Forgot Password | Developer</p>

        <form onSubmit={handleSubmit} className="space-y-4">


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
              type="password"
              placeholder="Abc#123"
              id="password"
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
              Set password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
