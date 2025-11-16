"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { registerUser } from "../services/authServices";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Navbar from "../components/layout/navbar";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(formData);

      if (response.token) {
        localStorage.setItem("token", response.token);
        toast.success("Registration Successful!");

        // Navigate after a short delay to ensure toast is visible
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(response.message || "Registration failed");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Registration failed");
      setLoading(false);
    }
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
            ${
              darkMode
                ? "border-white shadow-md shadow-white"
                : "border-black shadow-md shadow-black"
            }
          `}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 sm:mb-6 text-center">
              Register
            </h2>

            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-1">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  className="w-full"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-3 sm:py-2 
                ${darkMode ? "bg-white text-black" : "bg-black text-white"} 
                shadow-xs hover:bg-gray-400 hover:text-black`}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>

            <p className="text-xs sm:text-sm mt-4 text-center">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
