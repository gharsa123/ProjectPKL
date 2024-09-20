import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { endpoints } from "../../../api/apiEndpoint";
import { FaTimes } from "react-icons/fa";

interface FormData {
  id_organization: string;
  name: string;
}

const AddOrganization: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    id_organization: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showText, setShowText] = useState(false);

  const getEndpoint = (
    category: keyof typeof endpoints,
    company: string
  ): string | null => {
    const categoryEndpoints = endpoints[category];
    return categoryEndpoints ? categoryEndpoints[company] || null : null;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = getEndpoint("organization", "all");
      if (endpoint) {
        const response = await axios.post(endpoint, formData);
        if (response.status === 201) {
          setTimeout(() => {
            navigate(`/organization`, { state: { showToast: true } });
          }, 300);
        } else {
          setError("Unexpected response status");
        }
      } else {
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
    navigate("/organization");
  };

  return (
      <div className="bg-white p-10 rounded-3xl w-full h-auto">
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
          <h1 className="font-semibold mb-3 text-2xl">Add New Organization</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["id_organization", "name"].map((field) => (
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
          ))}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-end mt-8">
          <Button
            type="button"
            className="text-white w-32 py-3 rounded bg-blue-500 hover:bg-blue-600 disabled:hover:cursor-not-allowed disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={!formData.id_organization || !formData.name}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
  );
};

export default AddOrganization;
