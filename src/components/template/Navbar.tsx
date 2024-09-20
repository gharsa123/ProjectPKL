import React, { useState, useEffect } from "react";
import { FaAngleDown, FaArrowRightFromBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../api/Constants";
import Swal from "sweetalert2";

interface NavbarProps {
  isSidebarExpanded: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarExpanded }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete(`${BaseUrl}/logout`);
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      navigate("/");

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav
      className={`bg-custom-gradient3 text-white p-4 transition-all duration-300 ${
        isSidebarExpanded ? "ml-0" : "ml-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">IT Assets Management</h1>
        <div className="relative flex items-center">
          {username && (
            <span className="mr-5 text-white font-bold">Hai.. {username}</span>
          )}
          <FaAngleDown
            onClick={toggleDropdown}
            className="h-5 w-8 text-white cursor-pointer hover:text-gray-300"
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-24 w-48 bg-white rounded-md shadow-lg">
              <ul className="py-1">
                <li
                  className="flex items-center justify-start px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                  onClick={confirmLogout}
                >
                  <FaArrowRightFromBracket className="mr-2" />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
