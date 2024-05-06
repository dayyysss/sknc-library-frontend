import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateBook = ({ book }) => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [isbn, setIsbn] = useState("");
  const [writer, setWriter] = useState("");
  const [page_amount, setPageAmount] = useState("");
  const [stock_amount, setStockAmount] = useState("");
  const [published, setPublished] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Inisialisasi state dengan nilai buku saat komponen diinisialisasi
  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setSynopsis(book.synopsis || "");
      setIsbn(book.isbn || "");
      setWriter(book.writer || "");
      setPageAmount(book.page_amount || "");
      setStockAmount(book.stock_amount || "");
      setPublished(book.published || "");
      setCategory(book.category || "");
      setImage(book.image || "");
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "POST");
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
        `http://127.0.0.1:8000/api/book/${book.id}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Buku Berhasil Di Edit!", { position: "top-center" });
        navigate("/dashboard-admin/buku");
        window.location.reload();
      } else {
        toast.error("Gagal Edit Buku!", { position: "top-center" });
        setErrorMessage("Gagal Mengedit Buku!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat mengedit buku!", {
        position: "top-center",
      });
      setErrorMessage("Terjadi kesalahan saat mengedit buku!");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
          Edit Data Buku
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
              Edit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-booold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              onClick={() => setIsEditFormOpen(false)}
            >
              Batal
            </button>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
