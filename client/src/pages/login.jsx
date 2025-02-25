import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { loginUser } from "../services/authServices";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";
import Navbar from "../components/layout/navbar";
import toast from "react-hot-toast";

const Login = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await loginUser(formData);
      // This will only execute if the response was successful
      localStorage.setItem("token", response.token);
      
      // Make sure toast is visible before navigating
      toast.success("Login Successful");
      
      // Keep loading state true until navigation completes
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      
    } catch (error) {
      // This will catch any errors thrown from the loginUser function
      toast.error(error.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-screen flex flex-col ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />

      <motion.div
        className="flex items-center justify-center px-4 mt-36 sm:mt-12 md:mt-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`w-full max-w-xs sm:max-w-sm md:max-w-md p-6 sm:p-8 border rounded-xl 
            ${darkMode ? "border-white shadow-md shadow-white" : "border-black shadow-md shadow-black"}
          `}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 sm:mb-6 text-center">
            Login
          </h2>

          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
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
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 sm:py-2 ${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              } shadow-xs hover:bg-gray-400 hover:text-black`}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-xs sm:text-sm mt-4 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </motion.div>

      {/* Add this to ensure toasts have a container */}
      <div id="toast-container" />
    </div>
  );
};

export default Login;