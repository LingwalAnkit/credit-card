const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const verifyOtp = async (otpData) => {
    console.log("Sending OTP Data:", otpData); // Debugging

    const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otpData),
    });

    const data = await response.json();
    console.log("Response Data:", data); // Debugging

    return data;
};
