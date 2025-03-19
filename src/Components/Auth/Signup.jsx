import { useState } from "react";
import React from "react";

const Signup = () => {
  const [name,setName]=useState("");
  const [email, setEmail] = useState("");
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
        <p className="text-3xl font-bold text-center text-purple-600 mb-6">Registration | Developer</p>
        <p className="font-medium">Please register with your details</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              placeholder="developer"
              className="mt-1 block w-full border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="developer@gmail.com"
              className="mt-1 block w-full border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Confirm Password
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
