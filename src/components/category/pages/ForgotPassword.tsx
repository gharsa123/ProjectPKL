import React, { useState } from "react";
import Logo from "../../../assets/SinarIT12.png";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { endpoints } from "../../../api/apiEndpoint";
import Swal from "sweetalert2";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    try {
      await axios.post(endpoints.auth.forgot, { email });
      setSent(true);
      Swal.fire({
        title: "Email Sent!",
        text: "We've sent a password reset link to your email. Please follow the instructions to reset your password.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-custom-gradient2 h-screen sm:p-12 w-full p-6">
      <img src={Logo} alt="logo" className="mb-5" />
      <div className="bg-white p-6 rounded-3xl mt-10 w-full max-w-sm relative">
        <form onSubmit={handleForgotPassword}>
          <button
            type="button"
            onClick={handleNavigate}
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
            className="absolute right-4 top-4 text-xl text-gray-400"
          >
            <FaTimes />
          </button>
          {showText && (
            <span className="absolute right-14 top-4 bg-white border border-black text-sm p-1 text-black">
              Cancel
            </span>
          )}
          <h1 className="mb-6 text-center text-xl font-semibold">
            Reset Password
          </h1>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="text-sm border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full py-3 px-3 text-black"
            required={true}
          />
          <Button
            type="submit"
            className="w-full mt-5 bg-[#0055FF] text-white py-2 px-4 rounded-full hover:bg-[#0044CC] focus:outline-none focus:ring-2 focus:ring-[#0055FF] focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Sending.." : sent ? "Email sent" : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
