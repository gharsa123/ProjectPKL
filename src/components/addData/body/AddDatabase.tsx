import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { endpoints } from "../../../api/apiEndpoint";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";

interface FormData {
  id: string;
  host: string;
  users: string;
  Password: string;
  database_name: string;
  driver: string;
}

const AddDatabase: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    id: "",
    host: "",
    users: "",
    Password: "",
    database_name: "",
    driver: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showText, setShowText] = useState(false);

  const getEndpoint = (category: string, company: string): string | null => {
    const categoryEndpoints = endpoints[category as keyof typeof endpoints];
    return categoryEndpoints
      ? categoryEndpoints[company as keyof typeof categoryEndpoints] || null
      : null;
  };

  const handleSubmit = async () => {
    if (!formData.id || !selectedCompany || !formData.host) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = getEndpoint("database", selectedCompany);
      if (endpoint) {
        const finalEndpoint = endpoint.replace("id", formData.id);
        const response = await axios.post(finalEndpoint, formData);

        if (response.status === 201) {
          setTimeout(() => {
            navigate(`/database`, { state: { showToast: true } });
          }, 300);
        } else {
          console.error("Error in response:", response);
          setError("Failed to save data");
        }
      } else {
        console.error("Endpoint tidak ditemukan");
        setError("Endpoint tidak ditemukan");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleNavigate = () => {
    navigate("/database");
  };

  return (
    <div className="bg-white p-12 rounded-3xl w-full h-auto">
      <form>
      <div className="flex justify-center mb-6">
        <button
          type="submit"
          onClick={handleNavigate}
          onMouseEnter={() => setShowText(true)}
          onMouseLeave={() => setShowText(false)}
          className="absolute right-20 text-3xl justify-center text-gray-400"
        >
          <FaTimes />
          {showText && (
            <span className="absolute bg-white border border-black text-sm p-1 text-black">
              Cancel
            </span>
          )}
        </button>
        <h1 className="font-semibold mb-3 text-2xl">Add New Database</h1>
      </div>
      <label
        htmlFor="company"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select company
      </label>
      <select
        id="company"
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
        className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select Company</option>
        <option value="sinar12">SINAR 12</option>
        <option value="cmm">CMM GROUP</option>
        <option value="ptkayo">PUTIKAYO</option>
        <option value="bion">BIONATURE</option>
        <option value="sr12">SR12</option>
        <option value="gap">GAP</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["id", "host", "users", "Password", "database_name", "driver"].map(
          (field) => (
            <div className="mb-4" key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {field.replace("_", " ").toUpperCase()}
              </label>
              <Input
                id={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
          )
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex justify-end">
        <Button
          type="button"
          className={`text-white w-32 py-3 rounded bg-blue-500 hover:bg-blue-600 disabled:hover:cursor-not-allowed disabled:bg-gray-400`}
          onClick={handleSubmit}
          disabled={!selectedCompany}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
      </form>
    </div>
  );
};

export default AddDatabase;
