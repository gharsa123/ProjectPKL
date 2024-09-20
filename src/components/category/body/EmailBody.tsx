import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api/apiEndpoint";
import { endpointbyID } from "../../../api/apiEndpointbyID";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

interface DataItem {
  id: number;
  nik: string;
  nama_karyawan: string;
  position_title: string;
  e_mail: string;
  keterangan: string;
  dept: string;
  id_organization: string;
}

const EmailBody: React.FC = () => {
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
        const endpoint = getEndpoint("email", company);
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
            "aplikasi",
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

  // bdahs

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success("Data Ditambahkan!");
    }
  }, [location]);

  // jbdhj

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
        endpointbyID["email" as keyof typeof endpointbyID];
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
        endpointbyID["email" as keyof typeof endpointbyID];
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
      item.nik?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama_karyawan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.e_mail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keterangan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dept?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id_organization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/AddEmail");
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
                <label htmlFor="company" className="ont-semibold text-2xl">
                  Email.
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
                    <th className="border text-white border-white">Nik</th>
                    <th className="border text-white border-white">Name</th>
                    <th className="border text-white border-white">
                      Position Title
                    </th>
                    <th className="border text-white border-white">Email</th>
                    <th className="border text-white border-white">
                      Description
                    </th>
                    <th className="border text-white border-white">Dept</th>
                    <th className="border text-white border-white">
                      Id Organization
                    </th>
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
                            value={editData?.nik || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                nik: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.nik
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.nama_karyawan || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                nama_karyawan: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.nama_karyawan
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.position_title || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                position_title: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.position_title
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.e_mail || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                e_mail: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.e_mail
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.keterangan || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                keterangan: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.keterangan
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.dept || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                dept: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.dept
                        )}
                      </td>
                      <td className="border border-white text-center">
                        {editItemId === item.id ? (
                          <Input
                            type="text"
                            value={editData?.id_organization || ""}
                            onChange={(e) =>
                              setEditData({
                                ...editData!,
                                id_organization: e.target.value,
                              })
                            }
                            className="border rounded p-2"
                          />
                        ) : (
                          item.id_organization
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
    </div>
  );
};

export default EmailBody;
