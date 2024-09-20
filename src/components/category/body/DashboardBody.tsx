import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../atoms/Card";
import { BaseUrl } from "../../../api/Constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DataItem {
  title: string;
  count: number;
  color: string;
  path: string;
}

const DashboardBody: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess === "true") {
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/total-data`);
        const serverData = response.data;

        const cardData: DataItem[] = [
          {
            title: "Total Applications",
            count: serverData.totalAplikasi,
            color: "bg-[#E61E1E]",
            path: "/aplikasi",
          },
          {
            title: "Total Databases",
            count: serverData.totalDb_database,
            color: "bg-[#0055FF]",
            path: "/database",
          },
          {
            title: "Total Domains",
            count: serverData.totalDomain,
            color: "bg-green-500",
            path: "/domain",
          },
          {
            title: "Total Emails",
            count: serverData.totalEmail,
            color: "bg-yellow-500",
            path: "/email",
          },
          {
            title: "Total Servers",
            count: serverData.totalServers,
            color: "bg-purple-500",
            path: "/servers",
          },
          {
            title: "Total Organizations",
            count: serverData.totalOrganization,
            color: "bg-pink-500",
            path: "/organization",
          },
        ];

        setData(cardData);
      } catch (error) {
        console.error("Error fetching data from server:", error);
        toast.error("Failed to fetch data from server");
      }
    };

    fetchData();
  }, []);

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className=" bg-white p-12 rounded-3xl  w-full h-auto">
      <div className="flex items-center space-x-4">
        <label className="mb-4 text-2xl">Dashboard</label>
      </div>
      <div className="w-full h-1 mb-5 bg-gray-300"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div className="h-52" key={index}>
            <Card
              title={item.title}
              count={item.count}
              color={item.color}
              onClick={() => handleClick(item.path)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBody;
