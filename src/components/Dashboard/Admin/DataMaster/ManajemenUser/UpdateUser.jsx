import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const UpdateUser = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: null, // Menyimpan gambar yang akan diunggah
  });

  const modalRef = useRef(null);

  const handleChange = (e) => {
    // Jika input adalah file, simpan file di formData
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const formDataWithImage = new FormData(); // Buat objek FormData
      Object.keys(formData).forEach((key) => {
        // Masukkan setiap properti formData ke objek FormData
        formDataWithImage.append(key, formData[key]);
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Tentukan tipe konten sebagai form-data
        },
      };

      await axios.put(
        `http://127.0.0.1:8000/api/user/${userId}/update`,
        formDataWithImage,
        config
      );
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Memperbarui Pengguna</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Kata Sandi"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Konfirmasi Kata Sandi"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*" // Hanya menerima file gambar
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Perbaharui Pengguna
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
