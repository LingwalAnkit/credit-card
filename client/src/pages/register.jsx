"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { registerUser, verifyOtp } from "../services/authServices";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Navbar from "../components/layout/navbar";

const Register = () => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await registerUser(formData);

    if (response.message === "OTP sent for verification") {
      alert("OTP sent to your email!");
      setShowOtpField(true);
      setEmail(formData.email);
    } else {
      alert(response.message);
    }
    setLoading(false);
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    const response = await verifyOtp({ email, otp });

    if (response.token) {
      localStorage.setItem("token", response.token);
      alert("Account Verified & Registered Successfully");
      navigate("/");
    } else {
      alert(response.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className={`h-screen ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="">
          <Navbar />
        </div>
        <motion.div
          className="flex items-center justify-center px-4 mt-36 sm:mt-12 md:mt-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div
          className={`w-full max-w-xs sm:max-w-sm md:max-w-md p-6 sm:p-8 border rounded-xl 
            ${darkMode ? "border-white shadow-md shadow-white" : "border-black shadow-md shadow-black"}
          `}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 sm:mb-6 text-center">
              {showOtpField ? "Verify OTP" : "Register"}
            </h2>

            {!showOtpField ? (
              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full"
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  className="w-full"
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full"
                />
                <Button
                  type="submit"
                  text="Register"
                  loading={loading}
                  className={`w-full px-4 py-3 sm:py-2 
            ${darkMode ? "bg-white text-black" : "bg-black text-white"} 
            shadow-xs hover:bg-gray-400 hover:text-black`}
                />
              </form>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <Input
                  label="Enter OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full"
                />
                <Button
                  type="submit"
                  text="Verify OTP"
                  onClick={handleOtpSubmit}
                  loading={loading}
                  className={`w-full px-4 py-3 sm:py-2 
            ${darkMode ? "bg-white text-black" : "bg-black text-white"} 
            shadow-xs hover:bg-gray-400 hover:text-black`}
                />
              </div>
            )}

            {!showOtpField && (
              <p className="text-xs sm:text-sm mt-4 text-center">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/")}
                  className="underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
