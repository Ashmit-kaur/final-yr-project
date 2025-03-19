import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyAccount = () => {

  const [email, setEmail] = useState("");
  const [otp,setOtp]=useState("");
  const [error, setError] = useState("");
  const [loading,setloading]=useState(false)
  const [success,setsuccess]=useState(false)
  const navigate=useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();

    try{
        setloading(true)
        const result=await axios.post("http://localhost:3000/api/v1/auth/verifyotp",{email,userotp:otp});
        alert(result.data.message)
        navigate("/signin")
    }catch(error){
        console.log(error.response?.data?.message || error.message);
        setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
    setloading(false)
  };

  const handlesendotp=async (e)=>{
    e.preventDefault()
    try{
        setloading(true)
        const result=await axios.post("http://localhost:3000/api/v1/auth/generateotp",{email})
        alert(result.data.message)
        setsuccess(true)
    }catch(error){
        console.log(error.response?.data?.message || error.message);
        setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
    setloading(false)
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <p className="text-2xl font-bold text-center text-purple-600 mb-6">Verify Account | Developer</p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Password Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="Enter your registered emailId"
              placeholder="Abc#123"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full ${success?"hidden":"block"} bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 `}
              onClick={handlesendotp}
              disabled={loading}
            >
              {loading?"Sending otp...":"Send otp"}
            </button>
          </div>

          <div className={`${success ? "block" : "hidden"}`}>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-black"
            >
              Enter OTP
            </label>
            <div className="flex ">
            <input
              type="otp"
              placeholder="Enter otp sent to your registered emailId"
              id="otp"
              className="mt-1 w-full block border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              className="w-auto text-red-600 hover:text-red-700 shadow-xl  "
            >
              Resend otp
            </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`${success ? "block" : "hidden"} w-full bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 `}
              disabled={loading}
            >
              {loading?"Verifying":"Verify"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default VerifyAccount;
