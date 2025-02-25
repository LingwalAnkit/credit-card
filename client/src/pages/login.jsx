import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { loginUser } from "../services/authServices";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";
import Navbar from "../components/layout/navbar";

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
    setLoading(true);
    e.preventDefault();
    const response = await loginUser(formData);

    if (response.token) {
      localStorage.setItem("token", response.token);
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert(response.message);
    }
    setLoading(false);
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
              text="Login"
              loading={loading}
              className={`w-full px-4 py-3 sm:py-2 ${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              } shadow-xs hover:bg-gray-400 hover:text-black`}
            />
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
    </div>
  );
};

export default Login;
