import React, { ReactNode, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface TemplateProps {
  children: ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    const savedState = localStorage.getItem("isSidebarExpanded");
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("isSidebarExpanded", JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  return (
    <div className="flex h-screen bg-[#A5A3A3] bg-opacity-50">
      <Sidebar
        onSidebarStateChange={setIsSidebarExpanded}
        isExpanded={isSidebarExpanded}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarExpanded ? "ml-64" : "ml-16"
        }`}
      >
        <Navbar isSidebarExpanded={isSidebarExpanded} />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Template;
