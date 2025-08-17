import React from "react";
import LoginImage from "../../assets/Login.png";
import { FaEnvelope, FaKey, FaGoogle, FaFacebookF } from "react-icons/fa";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-cover">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:px-20 md:w-1/2 bg-white">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Log In</h2>
        <form className="w-full max-w-md space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="email"
              placeholder="Your email"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm md:text-base"
            />
          </div>
          <div className="relative">
            <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#14b8a6] text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition text-sm md:text-base"
          >
            Log In
          </button>
          <div className="text-right">
            <a href="#" className="text-[#14b8a6] text-sm hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full sm:w-1/2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
            >
              <FaGoogle className="text-red-500" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full sm:w-1/2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
            >
              <FaFacebookF className="text-blue-600" />
              Facebook
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-6 text-center md:text-left">
            Don’t have an account?{" "}
            <a href="/register" className="text-[#14b8a6] font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* Right Side - Quote and Image */}
      <div
        className="hidden md:flex flex-col items-center w-1/2 p-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <div className="text-center text-gray-800 text-lg font-medium bg-opacity-80 rounded-lg p-6">
          <span className="text-6xl text-gray-300 select-none">“</span>
          The future belongs to those who{" "}
          <span className="font-bold text-[#14b8a6]">believe</span> in the{" "}
          <span className="font-bold text-[#14b8a6]">beauty of their dreams</span>.
          <span className="block mt-4 text-right text-gray-600 font-normal text-base">
            - Eleanor Roosevelt
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;