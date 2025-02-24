import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { registerUser, verifyOtp } from "../services/authServices";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Register = () => {
  const navigate = useNavigate();
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
    e.preventDefault();
    const response = await registerUser(formData);

    if (response.message === "OTP sent for verification") {
      alert("OTP sent to your email!");
      setShowOtpField(true);
      setEmail(formData.email);
    } else {
      alert(response.message);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    const response = await verifyOtp({ email, otp });

    if (response.token) {
      localStorage.setItem("token", response.token);
      alert("Account Verified & Registered Successfully");
      navigate("/dashboard");
    } else {
      alert(response.message);
    }
    setLoading(false);
  };

  return (
    <motion.div className="flex min-h-screen items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 border border-black shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {showOtpField ? "Verify OTP" : "Register"}
        </h2>

        {!showOtpField ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
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
            <Button text="Register" type="submit" />
          </form>
        ) : (
          <div className="space-y-4">
            <Input
              label="Enter OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
            />
            <Button text={loading ? "Verifying..." : "Verify OTP"} onClick={handleOtpSubmit} disabled={loading} />
          </div>
        )}

        {!showOtpField && (
          <p className="text-sm mt-4 text-center">
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
  );
};

export default Register;
