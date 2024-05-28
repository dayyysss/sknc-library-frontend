// ImportExcel.jsx
import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";

const ImportExcel = ({ onClose, refreshData }) => {
  const fileInputRef = useRef();
  const modalRef = useRef();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("File yang diunggah:", selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    if (
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls") &&
      !file.name.endsWith(".csv")
    ) {
      alert("File must be in Excel format (XLSX or XLS) or CSV format");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Token not found. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/import-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Import successful");
        refreshData(); // Refresh data after successful import
        onClose(); // Close the modal after successful import
      } else {
        alert("Import failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        alert(`Import failed: ${error.response.data.message}`);
        console.error("Response error:", error.response);
      } else if (error.request) {
        alert("No response from server. Please try again.");
        console.error("Request error:", error.request);
      } else {
        alert(`Error: ${error.message}`);
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCancel = () => {
    onClose();
  };

  return (
    <div ref={modalRef} className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Import Data Menggunakan Excel</h2>
      <p className="text-gray-600 mb-4">
        File mungkin dikompresi (gzip, zip) atau tidak terkompresi.
        Nama file yang dikompresi harus diakhiri dengan .[format].[kompresi]. Contoh: .xlsx .xls .csv
      </p>
      <input
        type="file"
        accept=".xls,.xlsx,.csv"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="border border-gray-400 rounded-md py-2 px-4 mb-4"
      />
      <p className="text-gray-600 mb-4">Anda juga dapat seret dan lepaskan file di halaman manapun.</p>
      <div className="flex">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Unggah
        </button>
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          onClick={handleCancel}
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default ImportExcel;
