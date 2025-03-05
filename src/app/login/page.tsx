"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loginAnimation from "../../../public/login-animation.json";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.data.token);

        Swal.fire({
          title: "Success!",
          text: "Login successful",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/");

        });
      } else {
        Swal.fire("Error", data.message || "Login failed!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong! Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
          <Lottie animationData={loginAnimation} loop={true} className="w-full max-w-sm" />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 mt-2">
                <FaEnvelope className="text-gray-500 mr-3" />
                <input
                  type="email"
                  id="email"
                  className="w-full outline-none bg-transparent text-gray-700"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-sm font-semibold text-gray-600">Password</label>
              <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 mt-2">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  id="password"
                  className="w-full outline-none bg-transparent text-gray-700"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition duration-300"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
