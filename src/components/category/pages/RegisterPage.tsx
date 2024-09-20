import React, { useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api/apiEndpoint";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import Logo from "../../../assets/SinarIT12.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showText, setShowText] = useState(false);
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();
  const toggleVisibilityPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleVisibilityConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(endpoints.auth.users, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confPassword: formData.confPassword,
      });
      toast.success("Your Account Registration was Successful");
      setCreated(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      console.log(endpoints.auth.user);
      console.log("Registration successful", response.data);
    } catch (error) {
      console.error("Error during registration", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-custom-gradient2 h-screen sm:p-12 w-full p-6">
      <img src={Logo} alt="logo" />
      <div className="bg-white p-6 rounded-3xl mt-7 w-full max-w-sm relative">
        <button
          type="submit"
          onClick={handleCancel}
          onMouseEnter={() => setShowText(true)}
          onMouseLeave={() => setShowText(false)}
          className="absolute right-5 text-xl justify-center text-gray-400"
        >
          <FaTimes />
          {showText && (
            <span className="absolute bg-white border border-black text-sm p-1 text-black">
              Cancel
            </span>
          )}
        </button>
        <h1 className="mb-7 text-center font-semibold">Registration Form</h1>
        <form className="rounded-lg w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Input Username"
              value={formData.username}
              onChange={handleChange}
              className="text-sm border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full py-3 px-3 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Input Email"
              value={formData.email}
              onChange={handleChange}
              className="text-sm border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full py-3 px-3 text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Input Password"
              onChange={handleChange}
              className="text-sm border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full py-3 px-3 text-black"
              required
            />
            <button
              type="button"
              onClick={toggleVisibilityPassword}
              className="absolute items-center right-8 mt-3"
            >
              {showPassword ? (
                <FaEye className="text-gray-400" />
              ) : (
                <FaEyeSlash className="text-gray-400" />
              )}
            </button>
          </div>
          <div className="mb-6">
            <label
              htmlFor="conpass"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confPassword"
              placeholder="Input Confirm Password"
              value={formData.confPassword}
              onChange={handleChange}
              className="text-sm border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full py-3 px-3 text-black"
              required
            />
            <button
              type="button"
              onClick={toggleVisibilityConfirmPassword}
              className="absolute items-center right-8 mt-3"
            >
              {showConfirmPassword ? (
                <FaEye className="text-gray-400" />
              ) : (
                <FaEyeSlash className="text-gray-400" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#0055FF] text-white py-2 px-4 rounded-full hover:bg-[#0044CC] focus:outline-none focus:ring-2 focus:ring-[#0055FF] focus:ring-offset-2"
            disabled={loading || created}
          >
            {loading ? "Create.." : created ? "Created" : "Register"}
          </button>
          <div className="flex justify-center mt-1">
            <span className="text-sm mr-1 text-gray-600">
              already have an account?
            </span>
            <a href="/" className="text-sm text-blue-600 hover:underline">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
