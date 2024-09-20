import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api/apiEndpoint";
import { endpointbyID } from "../../../api/apiEndpointbyID";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface DataItem {
  id: string;
  name: string;
}

const OrganizationBody: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editItemId, setEditItemId] = useState<string | null>(null);
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
        const endpoint = endpoints.organization.all;
        const response = await axios.get(endpoint);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItemId(id);
      setEditData(itemToEdit);
    }
  };

  const handleSaveEdit = async () => {
    if (!editData) return;

    try {
      const updateEndpoint = endpointbyID.organization.all.replace(
        ":id",
        editData.id
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

  const handleDelete = async (id: string) => {
    try {
      const deleteEndpoint = endpointbyID.organization.all.replace(":id", id);
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
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/AddOrganization");
  };

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success("Data Ditambahkan!");
      console.log(toast, "pp");
    }
  }, [location.state?.showToast]);

  return (
    <div className=" bg-white p-10 rounded-3xl w-full h-auto">
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
                <label htmlFor="company" className="text-2xl">
                  Organization.
                </label>
              </div>
              <div className="flex items-center space-x-10">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border rounded-3xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleNavigate}
                  className="bg-[#0055FF] hover:bg-[#0044CC] text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Add Data
                </button>
              </div>
            </div>
            <div className="w-full h-1 mb-5 bg-gray-300"></div>
            {filteredData.length > 0 ? (
              <table className="min-w-full mb-7 bg-[#34D5F4]">
                <thead>
                  <tr>
                    <th className="border text-white border-white">
                      Id Organization
                    </th>
                    <th className="border text-white border-white">Name</th>
                    <th className="border text-white border-white">Actions</th>
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
                        {editItemId === item.id ? (
                          <input
                            type="text"
                            value={editData?.id || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                id: e.target.value,
                              })
                            }
                            className="border rounded p-1"
                          />
                        ) : (
                          item.id
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <input
                            type="text"
                            value={editData?.name || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                name: e.target.value,
                              })
                            }
                            className="border rounded p-1"
                          />
                        ) : (
                          item.name
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="bg-transparent text-blue-500 py-1 px-2 hover:text-blue-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="bg-transparent text-gray-500 py-1 px-2 hover:text-gray-600 ml-2"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="bg-transparent text-blue-500 py-1 px-2 hover:text-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-transparent text-red-500 py-1 px-2 hover:text-red-600 ml-2"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-700">No data found</div>
            )}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-[#0055FF] hover:bg-[#0044CC] text-white py-2 px-4 rounded disabled:opacity-0"
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage * itemsPerPage >= filteredData.length}
                className="bg-[#0055FF] hover:bg-[#0044CC] text-white py-2 px-4 rounded disabled:opacity-0"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default OrganizationBody;
