import React, { useState, useEffect, useRef } from "react";
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
import ImportExcel from "../../ImportExcel";
import Chart from 'chart.js/auto'
import { GrBundle } from "react-icons/gr";
import { Button as AntButton, Table, Popconfirm } from "antd";

const BukuTamu = () => {
  document.title = "Dashboard Admin - Buku Tamu";
  const [guestsToday, setGuestsToday] = useState([]);
  const chartRef = useRef(null);

  const [guest, setGuest] = useState({
    name: "",
    class: "",
    departemen: "",
    email: "",
    goals: "",
    telp: "",
  });

  useEffect(() => {
    fetchGuestsToday();
    createChart();
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
      setGuest({ name: "", class: "", departemen: "", email: "", goals: "", telp: "" });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Konfigurasi data untuk chart
  const data = {
    labels: [
      'Bulan Ini',
      'Bulan Kemarin',
      'Hari Ini'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      aspectRatio: 1.6, // Menentukan rasio aspek (lebar:tinggi), dapat disesuaikan sesuai kebutuhan
      maintainAspectRatio: true, // Menyatakan apakah chart harus mempertahankan rasio aspek saat ukuran container berubah
    },
  };

  // Fungsi untuk membuat chart
  const createChart = () => {
    if (chartRef && chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy(); // Destroy existing chart instance
      }
      chartRef.current.chart = new Chart(chartRef.current, config);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSummary = () => {
    console.log("Tombol Rekapitulasi Pengunjung diklik");
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
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>

        {/* Daftar Pengunjung Hari Ini */}
        <div className="mt-8 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Daftar Pengunjung Hari Ini [{getTodayDate()}]</h2>
          {/* Tombol Rekapitulasi Pengunjung */}
          <div className="flex items-center mb-4">
            <AntButton
              type="primary"
              icon={<GrBundle />} // Menambahkan ikon GrBundle di sebelah kiri teks tombol
              onClick={handleSummary} // Tentukan fungsi penanganan klik tombol di sini
              className="mr-2" // Memberikan margin kanan untuk memisahkan tombol dan teks
            >
              Rekapitulasi Pengunjung
            </AntButton>
          </div>
          <Table dataSource={guestsToday} pagination={false}>
            {/* Tambahkan kolom tabel */}
            <Table.Column title="No" dataIndex="key" render={(text, record, index) => index + 1} />
            <Table.Column title="Nama Pengunjung" dataIndex="name" />
            <Table.Column title="Kelas" dataIndex="class" />
            <Table.Column title="Jurusan" dataIndex="departemen" />
            <Table.Column title="Email" dataIndex="email" />
            <Table.Column title="Tujuan" dataIndex="goals" />
            <Table.Column title="No Telp" dataIndex="telp" />
            <Table.Column
              title="Aksi"
              dataIndex="operation"
              render={(text, record) =>
                dataSource.length >= 1 ? (
                  <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <a>Delete</a>
                  </Popconfirm>
                ) : null
              }
            />
          </Table>
        </div>
      </div>
    </>
  );
};

export default BukuTamu;
