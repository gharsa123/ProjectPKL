import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCubes,
  FaDatabase,
  FaGlobe,
  FaEnvelope,
  FaServer,
  FaUsers,
  FaAlignJustify,
} from "react-icons/fa";
import Logo from "../../assets/SinarIT12.png";

interface SidebarProps {
  onSidebarStateChange: (state: boolean) => void;
  isExpanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onSidebarStateChange, isExpanded }) => {
  const navigate = useNavigate();
  const [localIsExpanded, setLocalIsExpanded] = useState<boolean>(isExpanded);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarExpanded");
    if (savedState) {
      setLocalIsExpanded(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(localIsExpanded));
  }, [localIsExpanded]);

  const categories = [
    { label: "Dashboard", value: "dashboard", route: "/dashboard", icon: <FaTachometerAlt /> },
    { label: "Applications", value: "aplikasi", route: "/aplikasi", icon: <FaCubes /> },
    { label: "Database", value: "database", route: "/database", icon: <FaDatabase /> },
    { label: "Domain", value: "domain", route: "/domain", icon: <FaGlobe /> },
    { label: "Email", value: "email", route: "/email", icon: <FaEnvelope /> },
    { label: "Server", value: "servers", route: "/servers", icon: <FaServer /> },
    { label: "Organization", value: "organization", route: "/organization", icon: <FaUsers /> },
  ];

  const handleCategoryChange = (route: string) => {
    navigate(route);
  };

  return (
    <div>
      <aside
        className={`fixed top-0 left-0 h-full bg-custom-gradient2 text-white flex flex-col p-4 transition-all duration-300 ease-in-out
                ${localIsExpanded ? "w-64" : "w-16"}`}
        onMouseEnter={() => {
          setLocalIsExpanded(true);
          onSidebarStateChange(true);
        }}
        onMouseLeave={() => {
          setLocalIsExpanded(false);
          onSidebarStateChange(false);
        }}
      >
        <div className="flex justify-end mr-1 mb-4">
          <FaAlignJustify
            className={`text-white text-xl mt-3 cursor-pointer transition-transform duration-500
            ${localIsExpanded ? "rotate-180" : ""}`}
            onClick={() => setLocalIsExpanded(!localIsExpanded)}
          />
        </div>

        <div className="flex-grow">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.route)}
              className={`flex items-center py-2 px-4 text-left rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        ${localIsExpanded ? "opacity-100" : "opacity-0"} transition-opacity duration-300 mb-5`}
            >
              <span className="mr-4">{cat.icon}</span>
              {localIsExpanded && cat.label.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex-shrink-0">
          <img src={Logo} className="mx-auto my-4 w-40" alt="Logo" />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
