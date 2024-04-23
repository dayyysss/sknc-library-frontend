import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateBook from "./UpdateBook"; // Import UpdateBook component

const BookList = () => {
  document.title = "Dashboard Admin - Data Buku";
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null); // State to hold selected book for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State to control edit form display

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/book?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      if (response.data.success) {
        const { data, last_page, total } = response.data.data;
        console.log(data)
        setBooks(data);
        setTotalPages(last_page);
        setTotalBooks(total);
      }
    } catch (error) {
      console.error(error);
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
        await axios.delete(`http://127.0.0.1:8000/api/book/${id}`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        fetchData();
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

  const handleUpdate = (id) => {
    // Log id buku yang dipilih ke console
    console.log("Selected book id:", id);

    // Temukan buku yang sesuai dengan id dari daftar buku
    const selectedBook = books.find(book => book.id === id);

    // Periksa jika buku ditemukan
    if (selectedBook) {
      // Buka formulir edit dan tetapkan buku yang dipilih ke state
      setIsEditFormOpen(true);
      setSelectedBook(selectedBook);
    } else {
      console.error("Book not found!");
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleBookClick = async (bookId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/book/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      if (response.data.success) {
        setSelectedBook(response.data.data); // Set selected book details
        setIsModalOpen(true); // Open modal after getting book details
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBookModalOpen = () => {
    setIsAddBookModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen px-[25px] pt-[25px] pb-[auto] bg-[#F8F9FC] overflow-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
            Data Buku
          </h1>
          <Link
            to="/dashboard-admin/buku/add-buku/*"
            className="bg-blue-500 h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px]"
          >
            Tambah Buku
          </Link>
        </div>
        <div className="mt-4">
          <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
            <div className="flex items-center border border-slate-500 rounded">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari sesuatu di sini..."
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Cari
              </button>
            </div>
          </form>
        </div>
        <p className="mt-4 text-left">Total Buku : {totalBooks}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {books.map((book, index) => (
            <div key={index + 1} className="bg-white p-4 rounded shadow-md hover:shadow-lg flex flex-col">
              <div className="cursor-pointer" onClick={() => handleBookClick(book.id)}>
                <div className="flex justify-center">
                  <img src={book.image} alt={book.title} className="h-24 w-auto object-contain" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
              </div>
              <p className="text-gray-600 mb-2 flex-grow">{book.synopsis}</p> {/* Sinopsis buku */}

              {/* Komponen edit stok buku dan hapus di sini */}
              <div className="flex justify-between items-center mt-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Stok Buku : {book.stock_amount}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleUpdate(book.id)} className="text-blue-500">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(book.id)} className="text-red-500">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-left mt-8">
          Page: {page} of {totalPages}
        </p>
        <div className="flex justify-center items-center mb-9" aria-label="pagination">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Stack>
        </div>
      </div>

    </>
  );
};

export default BookList;
