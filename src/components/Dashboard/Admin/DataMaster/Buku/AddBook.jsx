import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [isbn, setIsbn] = useState("");
  const [writer, setWriter] = useState("");
  const [page_amount, setPageAmount] = useState("");
  const [stock_amount, setStockAmount] = useState("");
  const [published, setPublished] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Tersedia");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("synopsis", synopsis);
    formData.append("isbn", isbn);
    formData.append("writer", writer);
    formData.append("page_amount", page_amount);
    formData.append("stock_amount", stock_amount);
    formData.append("published", published);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/book/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (response.data.success) {
        // Jika sukses, tampilkan swal success
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Buku berhasil ditambahkan',
          showConfirmButton: false,
          timer: 1500 // Durasi tampilan swal dalam milidetik
        }).then(() => {
          navigate("/dashboard-admin/buku");
        });
      } else {
        // Jika gagal, tampilkan swal error
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Gagal menambahkan buku',
          showConfirmButton: false,
          timer: 1500 // Durasi tampilan swal dalam milidetik
        });
        setErrorMessage("Gagal menambahkan buku");
      }
    } catch (error) {
      console.error("Error:", error);
      // Tampilkan swal error jika terjadi kesalahan
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat menambahkan buku',
        showConfirmButton: false,
        timer: 1500 // Durasi tampilan swal dalam milidetik
      });
      setErrorMessage("Terjadi kesalahan saat menambahkan buku");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set file object to image state
  };

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  return (
    <div className="px-[25px] pt-[25px] bg-[#F8F9FC]">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer mb-6">
          Tambah Data Buku
        </h1>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama Buku
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan nama buku"
              required={true}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Synopsis
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Masukkan synopsis singkat"
              required={true}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">ISBN</label>
            <div className="flex">
              <input
                type="text"
                maxLength="13"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Masukkan no isbn buku"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Penulis
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              placeholder="Masukkan penulis buku"
              required={true}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Jumlah Halaman
            </label>
            <div className="flex">
              <input
                type="number"
                value={page_amount}
                onChange={(e) => setPageAmount(e.target.value)}
                placeholder="Masukkan jumlah halaman buku"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Stok Buku
            </label>
            <div className="flex">
              <input
                type="number"
                value={stock_amount}
                onChange={(e) => setStockAmount(e.target.value)}
                placeholder="Masukkan stok buku"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tahun Terbit
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              placeholder="Masukkan tahun terbit"
              required={true}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Kategori
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Masukkan kategori buku"
              required={true}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Sampul Buku
            </label>
            <input
              type="file"
              accept="image/*"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileUpload}
              required
            />
          </div>

          <div className="col-span-2 flex justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Tambah
            </button>
            <Link
              to="/dashboard-admin/buku"
              className="bg-blue-500 hover:bg-blue-700 text-white font-booold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            >
              Batal
            </Link>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddBook;
