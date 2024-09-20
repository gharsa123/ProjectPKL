import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api/apiEndpoint";
import { endpointbyID } from "../../../api/apiEndpointbyID";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

interface DataItem {
  id: number;
  type: string;
  ip_local: string;
  ip_public: string;
  os: string;
  Username: string;
  Password: string;
  core: string;
  ram: string;
  hdd: string;
}

const ServerBody: React.FC = () => {
  const [company, setCompany] = useState<string>("sinar12");
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editData, setEditData] = useState<DataItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = getEndpoint("servers", company);
        if (endpoint) {
          const response = await axios.get(endpoint, {
            params: {
              limit: 1000,
              offset: (currentPage - 1) * itemsPerPage,
            },
          });
          setData(response.data);
        } else {
          console.error(
            "Endpoint tidak ditemukan untuk kategori:",
            "server",
            "dan perusahaan:",
            company
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [company, currentPage, itemsPerPage]);

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success("Data Ditambahkan!");
      console.log(toast.success)
    }
  }, [location]);

  const getEndpoint = (category: string, company: string): string | null => {
    const categoryEndpoints = endpoints[category as keyof typeof endpoints];
    return categoryEndpoints
      ? categoryEndpoints[company as keyof typeof categoryEndpoints] || null
      : null;
  };

  const handleEdit = (id: number) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItemId(id);
      setEditData(itemToEdit);
    }
  };

  const handleSaveEdit = async () => {
    if (!editData) return;

    try {
      const categoryEndpoints =
        endpointbyID["servers" as keyof typeof endpointbyID];
      const endpointTemplate = categoryEndpoints
        ? categoryEndpoints[company as keyof typeof categoryEndpoints]
        : null;

      if (!endpointTemplate) {
        setError("Endpoint tidak ditemukan untuk melakukan Save Data");
        return;
      }

      const updateEndpoint = endpointTemplate.replace(
        ":id",
        editData.id.toString()
      );
      await axios.patch(updateEndpoint, editData);

      setData((prevData) =>
        prevData.map((item) => (item.id === editData.id ? editData : item))
      );
      setEditItemId(null);
      setEditData(null);
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Error updating item");
    }
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    try {
      const categoryEndpoints =
        endpointbyID["servers" as keyof typeof endpointbyID];
      const endpointTemplate = categoryEndpoints
        ? categoryEndpoints[company as keyof typeof categoryEndpoints]
        : null;

      if (!endpointTemplate) {
        setError("Endpoint tidak ditemukan untuk melakukan Delete Data");
        return;
      }

      const deleteEndpoint = endpointTemplate.replace(":id", id.toString());
      await axios.delete(deleteEndpoint);

      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Error deleting item");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const filteredData = data.filter(
    (item) =>
      item.id?.toString().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ip_local?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ip_public?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.os?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Password?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.core?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ram?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hdd?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/AddServer");
  };

  return (
    <div className="p-10 bg-white rounded-3xl w-full h-auto">
      {loading ? (
        <div className="flex justify-center items-center h-auto">
          <span>Loading...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <label htmlFor="company" className="font-semibold text-2xl">
                  Server.
                </label>
                <select
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Company</option>
                  <option value="sinar12">SINAR 12</option>
                  <option value="cmm">CMM GROUP</option>
                  <option value="ptkayo">PUTIKAYO</option>
                  <option value="bion">BIONATURE</option>
                  <option value="sr12">SR12</option>
                  <option value="gap">GAP</option>
                </select>
              </div>
              <div className="flex items-center space-x-10">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border rounded-3xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={handleNavigate}
                  className="bg-[#0055FF] hover:bg-[#0044CC] text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  type={"button"}
                >
                  Add Data
                </Button>
              </div>
            </div>
            <div className="w-full h-1 mb-5 bg-gray-300"></div>
            {filteredData.length > 0 ? (
              <table className="min-w-full mb-7 bg-[#34D5F4]">
                <thead>
                  <tr>
                    <th className="border text-white border-white">Id</th>
                    <th className="border text-white border-white">Type</th>
                    <th className="border text-white border-white">Ip Local</th>
                    <th className="border text-white border-white">
                      Ip Public
                    </th>
                    <th className="border text-white border-white">Os</th>
                    <th className="border text-white border-white">Username</th>
                    <th className="border text-white border-white">Password</th>
                    <th className="border text-white border-white">Core</th>
                    <th className="border text-white border-white">Ram</th>
                    <th className="border text-white border-white">Hdd</th>
                    <th className="border text-white  border-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={
                        index % 2 === 0 ? "bg-[#E0F7FA]" : "bg-[#FEFEFE]"
                      }
                    >
                      <td className="border border-white text-center">
                        {item.id}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.type || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                type: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.type
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.ip_local || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                ip_local: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.ip_local
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.ip_public || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                ip_public: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.ip_public
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.os || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                os: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.os
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.Username || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                Username: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.Username
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.Password || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                Password: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.Password
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.core || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                core: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.core
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.ram || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                ram: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.ram
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.hdd || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                hdd: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.hdd
                        )}
                      </td>
                      <td className="border border-white text-center space-x-2">
                        {editItemId === item.id ? (
                          <>
                            <Button
                              onClick={handleSaveEdit}
                              className="bg-transparent text-blue-500 py-1 px-3 hover:text-blue-600"
                              type={"button"}
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelEdit}
                              className="bg-transparent text-gray-500 py-1 px-3 hover:text-gray-600"
                              type={"button"}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => handleEdit(item.id)}
                              className="bg-transparent text-blue-500 py-1 px-3 hover:text-blue-600"
                              type={"button"}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDelete(item.id)}
                              className="bg-transparent text-red-500 py-1 px-3 hover:text-red-600"
                              type={"button"}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center mt-4">No data available</div>
            )}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-[#0055FF] hover:bg-[#0044CC] text-white py-2 px-3 rounded disabled:opacity-0"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredData.length / itemsPerPage)}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage * itemsPerPage >= filteredData.length}
                className="bg-[#0055FF] hover:bg-[#0044CC] text-white py-2 px-3 rounded disabled:opacity-0"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <ToastContainer className="z-50" />
    </div>
  );
};

export default ServerBody;
