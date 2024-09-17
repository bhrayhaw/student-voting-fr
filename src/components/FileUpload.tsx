import React, { useState } from "react";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setErrorMessage(null); 
      setSuccessMessage(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setErrorMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true); 
    try {
      const response = await axios.post(`${base_url}/api/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
      setSuccessMessage("File uploaded successfully!");
      setErrorMessage(null); 
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Error uploading file");
      } else {
        setErrorMessage("An unknown error occurred. Please try again.");
      }
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv, .xlsx, .xls"
          className="border-2 border-gray-300 p-2 rounded-md shadow-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload"}{" "}
          {/* Button text changes based on loading state */}
        </button>
      </form>

      {/* Display a loading spinner when the upload is in progress */}
      {loading && (
        <div className="mt-4">
          <svg
            className="animate-spin h-6 w-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      )}

      {/* Error and success messages */}
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}

      {successMessage && (
        <div className="text-green-500 mt-4">{successMessage}</div>
      )}
    </div>
  );
};

export default FileUpload;
