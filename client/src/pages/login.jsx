import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { loginUser } from "../services/authServices";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData);

    if (response.token) {
      localStorage.setItem("token", response.token);
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert(response.message);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-white text-black"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md p-8 border border-black shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
          />

          <Button text="Login" type="submit" />
        </form>

        <p className="text-sm mt-4 text-center">
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
  );
};

export default Login;
