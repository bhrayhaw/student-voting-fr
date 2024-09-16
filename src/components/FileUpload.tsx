import React, { useState } from "react";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  if (!file) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${base_url}/upload/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};


  return (
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
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Upload
      </button>
    </form>
  );
};

export default FileUpload;
