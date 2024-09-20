import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/SinarIT12.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { endpoints } from "../../../api/apiEndpoint";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedUsername = localStorage.getItem("username");
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      setLoading(true);
      try {
        const response = await axios.post(endpoints.auth.login, {
          username,
          password,
        });

        const { token } = response.data;

        if (rememberMe) {
          localStorage.setItem("username", username);
        } else {
          localStorage.removeItem("username");
        }
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("loginSuccess", "true");

        toast.success("Login successful!");
        navigate("/dashboard");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message ||
              "Login failed. Please check your username and password."
          );
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Masukkan Username dan Password Terlebih Dahulu.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-custom-gradient2 h-screen sm:p-12 w-full p-6">
      <img src={Logo} alt="logo" />
      <div className="bg-white p-6 rounded-3xl mt-7 w-full max-w-sm relative">
        <h1 className="mb-10 text-center font-semibold">LOGIN</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan Username"
              className="text-sm border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full py-3 px-3 text-black"
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Password"
              className="text-sm border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full py-3 px-3 text-black"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="mt-7 absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {passwordVisible ? (
                <FaEye className="text-gray-400" />
              ) : (
                <FaEyeSlash className="text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center text-sm text-gray-700">
              <div
                className={`relative inline-block w-8 h-4 mr-2 align-middle select-none transition duration-200 ease-in-out ${
                  rememberMe ? "bg-blue-600" : "bg-gray-300"
                } rounded-full`}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="toggle-checkbox"
                />
              </div>
              <span>Remember Me</span>
            </label>
            <a
              href="forgotPass"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-[#0055FF] text-white py-2 px-4 rounded-full hover:bg-[#0044CC] focus:outline-none focus:ring-2 focus:ring-[#0055FF] focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="flex justify-center mt-1">
            <span className="text-sm mr-1 text-gray-600">Not a member?</span>
            <a
              href="register"
              className="text-sm text-blue-600 hover:underline"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
