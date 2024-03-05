import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoIosArrowDropdown } from "react-icons/io";
import axios from "axios";
import swal from 'sweetalert2';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function DaftarBukuA() {
  document.title = "Skanic Library - Daftar Buku";

  const [modalOpen, setModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null); // State untuk menyimpan detail buku yang dipilih

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/book?page=${page}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (response.data.success) {
        const { data, last_page, total } = response.data.data;
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

  const getUserId = () => {
    // Implementasi pengambilan user_id yang benar
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleBookClick = async (bookId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (response.data.success) {
        setSelectedBook(response.data.data); // Set detail buku yang dipilih
        openModal(); // Buka modal setelah mendapatkan detail buku
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePinjamBuku = async () => {
    try {
      // Kirim request ke server untuk meminjam buku
      await axios.post('http://127.0.0.1:8000/api/borrow/create', {
        user_id: getUserId(), // Mengirim user_id yang benar
        book_id: selectedBook.id, // Mengirim book_id yang benar
      }, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      // Tampilkan SweetAlert2 sukses
      await swal.fire({
        icon: 'success',
        title: 'Buku Berhasil Dipinjam',
        text: 'Terima kasih! Buku berhasil dipinjam.',
      });

      // Tutup modal setelah sukses meminjam buku
      closeModal();
    } catch (error) {
      console.error(error);
      // Tampilkan pesan kesalahan jika terjadi error
      if (error.response && error.response.status === 422) {
        // Validasi gagal, buku tidak tersedia
        await swal.fire({
          icon: 'error',
          title: 'Gagal Meminjam Buku',
          text: 'Maaf, buku tidak tersedia untuk dipinjam saat ini.',
        });
      } else {
        // Kesalahan lain
        await swal.fire({
          icon: 'error',
          title: 'Gagal Meminjam Buku',
          text: 'Terjadi kesalahan saat meminjam buku. Silakan coba lagi nanti.',
        });
      }
    }
  };

  // Memisahkan books menjadi dua bagian, masing-masing menampilkan 4 buku
  const booksTop = books.slice(0, 4);
  const booksBottom = books.slice(4);

  return (
    <>
      <div className="px-[25px] pt-[25px] bg-[#F8F9FC]">
        <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
          Daftar Buku
        </h1>
        <div className="flex items-center justify-between">
          <h1 className="pb-5">Buku Yang Tersedia : {totalBooks}</h1>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Kategori
                <IoIosArrowDropdown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Komik
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Novel
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Fiksi
                      </a>
                    )}
                  </Menu.Item>
                  <form method="POST" action="#">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                        >
                          Non Fiksi
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* Daftar buku bagian atas */}
        <div className="grid grid-cols-4 gap-5 mt-5">
          {booksTop.map((book) => (
            <Card key={book.id} sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                alt="Cover Buku"
                height="140"
                image={book.image}
                onClick={() => handleBookClick(book.id)} // Panggil fungsi handleBookClick saat buku diklik
                style={{ cursor: "pointer" }} // Ubah kursor saat diarahkan ke gambar buku
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="cursor-pointer"
                  onClick={() => handleBookClick(book.id)} // Panggil fungsi handleBookClick saat judul buku diklik
                  style={{ cursor: "pointer" }} // Ubah kursor saat diarahkan ke judul buku
                >
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Penulis: {book.writer}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Kategori: {book.category}
                </Typography>
              </CardContent>

              <CardActions className="flex justify-center">
                <Typography style={{ color: book.stock_amount === 0 ? "red" : "#4CAF50", fontWeight: "bold" }}>
                  {book.stock_amount === 0 ? "Tidak Tersedia" : "Tersedia"}
                </Typography>
              </CardActions>
            </Card>
          ))}
        </div>

        {/* Daftar buku bagian bawah */}
        <div className="grid grid-cols-4 gap-5 mt-5">
          {booksBottom.map((book) => (
            <Card key={book.id} sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                alt="Cover Buku"
                height="140"
                image={book.image}
                onClick={() => handleBookClick(book.id)} // Panggil fungsi handleBookClick saat buku diklik
                style={{ cursor: "pointer" }} // Ubah kursor saat diarahkan ke gambar buku
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="cursor-pointer"
                  onClick={() => handleBookClick(book.id)} // Panggil fungsi handleBookClick saat judul buku diklik
                  style={{ cursor: "pointer" }} // Ubah kursor saat diarahkan ke judul buku
                >
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Penulis: {book.writer}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Kategori: {book.category}
                </Typography>
              </CardContent>

              <CardActions className="flex justify-center">
                <Typography style={{ color: book.stock_amount === 0 ? "red" : "#4CAF50", fontWeight: "bold" }}>
                  {book.stock_amount === 0 ? "Tidak Tersedia" : "Tersedia"}
                </Typography>
              </CardActions>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          className="mt-11 flex justify-center items-center"
        />
      </div>

      {/* Konten modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="z-50 bg-white p-8 rounded-lg max-w-lg w-full mx-4 flex">
            {/* Gambar Sampul Buku */}
            <div className="w-1/3 mr-4">
              <img src={selectedBook.image} alt="Sampul Buku" className="w-full h-full object-cover" />
            </div>
            {/* Informasi Buku */}
            <div className="w-2/3">
              <h2 className="text-xl font-bold mb-4">Detail Buku </h2>
              <p className="text-left">Judul: {selectedBook.title}</p>
              <p className="text-left">Kategori: {selectedBook.category}</p>
              <p className="text-left">ISBN: {selectedBook.isbn}</p>
              <p className="text-left">Penulis: {selectedBook.writer}</p>
              <p className="text-left">Diterbitkan: {selectedBook.published}</p>
              <p className="text-left" style={{ color: selectedBook.stock_amount === 0 ? "red" : "#4CAF50" }}>
                Status: {selectedBook.stock_amount === 0 ? "Tidak Tersedia" : "Tersedia"}
              </p>
              <p className="text-left">Sinopsis: {selectedBook.synopsis}</p>
              {/* Tombol untuk menutup modal */}
              <div className="mt-4">
                <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={handlePinjamBuku}>Pinjam Buku</button>
                <button className="bg-gray-500 text-white px-4 py-2" onClick={closeModal}>Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DaftarBukuA;
