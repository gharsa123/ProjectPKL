import React, { useState } from "react";
import Logo from "../../../assets/SinarIT12.png";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { endpoints } from "../../../api/apiEndpoint";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [showText, setShowText] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match",
      });
      return;
    }

    try {
      await axios.post(endpoints.auth.resetPass, {
        password: password,
        token: token,
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password reset successfully.",
      }).then(() => {
        setTimeout(() => navigate("/"), 1000);
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data.message ||
            "Failed to reset password. Please try again.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-custom-gradient2 h-screen sm:p-12 w-full p-6">
      <img src={Logo} alt="logo" className="mb-5" />
      <div className="bg-white p-6 rounded-3xl mt-10 w-full max-w-sm relative">
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => navigate("/")}
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
            New Password
          </h1>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <div className="relative">
            <Input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full py-3 px-3 text-black"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {passwordVisible ? (
                <FaEye className="text-gray-400" />
              ) : (
                <FaEyeSlash className="text-gray-400" />
              )}
            </button>
          </div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <Input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              placeholder="Re-enter New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-sm border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full py-3 px-3 text-black"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {confirmPasswordVisible ? (
                <FaEye className="text-gray-400" />
              ) : (
                <FaEyeSlash className="text-gray-400" />
              )}
            </button>
          </div>
          <Button
            type="submit"
            className="mt-8 bg-[#0055FF] hover:bg-[#0044CC] p-2 rounded-full w-full text-white"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
