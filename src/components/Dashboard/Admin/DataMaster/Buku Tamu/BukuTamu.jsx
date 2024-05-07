import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateUser from "./UpdateTamu";
import { MdOutlineCheckBox } from "react-icons/md";
import AddUserModal from "./TambahTamu";
import { PiMicrosoftExcelLogoLight } from "react-icons/pi";
import ImportExcel from "../../ImportExcel";

const BukuTamu = () => {
  document.title = "Dashboard Admin - Buku Tamu";
  const [guestsToday, setGuestsToday] = useState([]);

  const [guest, setGuest] = useState({
    name: "",
    class: "",
    departemen: "",
    address: "",
    email: "",
    goals: "",
    telp: "",
  });

  useEffect(() => {
    fetchGuestsToday();
  }, []);

  const fetchGuestsToday = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/guestbook/", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        params: {
          page: page,
        },
      });
      if (response.data.success) {
        setGuestsToday(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post("http://127.0.0.1:8000/api/guestbook/create", guest, config);
      // Membersihkan formulir setelah pengiriman berhasil
      setGuest({ name: "", class: "", departemen: "", address: "", email: "", goals: "", telp: "" });
      // Memperbarui data tamu setelah pengiriman berhasil
      fetchGuestsToday();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pengguna berhasil ditambahkan!",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.email[0],
        });
      } else {
        console.error("Error adding user:", error);
      }
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

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Yakin Mau Hapus?",
        text: "Data akan dihapus dari database",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus saja!",
      });
      if (result.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/api/guestbook/${id}`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        fetchGuestsToday(); // Mengganti 'fetchData()' menjadi 'fetchGuestsToday()' untuk memperbarui data setelah penghapusan pengguna
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = async (userId) => {
    setSelectedBook(userId);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setSelectedBook(null); // Set selected user to null to display AddUserModal
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchData(); // Perbarui data setelah menutup modal
  };

  const refreshData = () => {
    fetchData();
  };

  const handleImportExcel = () => {
    // Ketika tombol "Import Excel" diklik, buka modal unggah Excel
    setIsImportModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen px-[25px] pt-[25px] pb-[auto] bg-[#F8F9FC] overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
            Buku Tamu Perpustakaan Skanic
          </h1>
        </div>

        {/* Form Input Identitas Pengunjung */}
        <div className="mt-8 flex space-x-8">
          <div className="w-1/2 bg-white p-4 rounded-md shadow-md">
            <h1 className="text-lg font-semibold mb-4">Identitas Pengunjung</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  placeholder="Nama Pengunjung"
                  type="text"
                  name="name"
                  value={guest.name}
                  onChange={handleChange}
                  className="mt-1 block px-4 py-2 w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="Kelas"
                  type="text"
                  name="class"
                  value={guest.class}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="Jurusan"
                  type="text"
                  name="departemen"
                  value={guest.departemen}
                  onChange={handleChange}
                  className="mt-1 block px-4 py-2 w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="Alamat"
                  type="text"
                  name="address"
                  value={guest.address}
                  onChange={handleChange}
                  className="mt-1 block px-4 py-2 w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="Alamat Email"
                  type="email"
                  name="email"
                  value={guest.email}
                  onChange={handleChange}
                  className="mt-1 block px-4 py-2 w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="Tujuan"
                  type="text"
                  name="goals"
                  value={guest.goals}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="No Handphone"
                  type="tel"
                  name="telp"
                  value={guest.telp}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>

          {/* Statistik Pengunjung */}
          <div className="w-1/2 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Statistik Pengunjung</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-2">Hari Ini</h3>
                {/* Tambahkan data statistik untuk hari ini */}
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-2">Kemarin</h3>
                {/* Tambahkan data statistik untuk kemarin */}
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-2">Bulan Ini</h3>
                {/* Tambahkan data statistik untuk bulan ini */}
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-2">Keseluruhan</h3>
                {/* Tambahkan data statistik untuk keseluruhan */}
              </div>
            </div>
          </div>
        </div>

        {/* Daftar Pengunjung Hari Ini */}
        <div className="mt-8 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Daftar Pengunjung Hari Ini</h2>
          <table className="w-full table-fixed">
            {/* Tambahkan header tabel */}
            <thead>
              <tr>
                <th className="px-4 py-2 w-1/12">No</th>
                <th className="px-4 py-2 w-2/12">Nama Pengunjung</th>
                <th className="px-4 py-2 w-2/12">Kelas</th>
                <th className="px-4 py-2 w-2/12">Jurusan</th>
                <th className="px-4 py-2 w-2/12">Alamat Email</th>
                <th className="px-4 py-2 w-1/12">Tujuan</th>
                <th className="px-4 py-2 w-1/12">Alamat</th>
                <th className="px-4 py-2 w-1/12">No Telp</th>
              </tr>
            </thead>
            <tbody>
              {/* Tambahkan data pengunjung */}
              {guestsToday.map((guest, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{guest.name}</td>
                  <td className="border px-4 py-2">{guest.class}</td>
                  <td className="border px-4 py-2">{guest.departemen}</td>
                  <td className="border px-4 py-2">{guest.email}</td>
                  <td className="border px-4 py-2">{guest.goals}</td>
                  <td className="border px-4 py-2">{guest.address}</td>
                  <td className="border px-4 py-2">{guest.telp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BukuTamu;
