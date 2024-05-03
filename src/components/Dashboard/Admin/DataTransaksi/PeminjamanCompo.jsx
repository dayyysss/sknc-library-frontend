import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { MdOutlineCheckBox } from "react-icons/md";
import AddPeminjaman from "./AddPeminjaman";

const PeminjamanCompo = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, searchQuery]);

  const fetchData = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/borrow/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page, // Gunakan nilai page yang diatur sebelumnya
          per_page: rowsPerPage,
          q: searchQuery,
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

  const handleAccept = async (id) => {
    try {
      console.log("Accepting borrow with id:", id);
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/borrow/${id}/update-status`,
        { status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      Swal.fire({
        title: "Success!",
        text: "Status peminjaman berhasil diubah menjadi Sukses.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating status peminjaman:", error);
    }
  };

  const handleDetail = (borrow) => {
    setSelectedBorrow(borrow);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedBorrow(null);
    setIsDetailModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // Ubah indeks halaman agar dimulai dari 1
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Set halaman kembali ke 1 saat jumlah baris per halaman diubah
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not available. Please login.");
      return null;
    }
    return token;
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="px-[25px] pt-[25px] pb-[370px] bg-[#F8F9FC]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
            Peminjaman Buku
          </h1>
        </div>
        <div className="flex items-center">
          <TextField
            label="Cari"
            variant="outlined"
            size="small"
            className="px-4 py-2 mr-4 rounded"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            onClick={openAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 ml-4"
          >
            Tambah Peminjaman
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className="table_list mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table_cell">No</TableCell>
              <TableCell className="table_cell">Peminjaman Awal</TableCell>
              <TableCell className="table_cell">Tenggat</TableCell>
              <TableCell className="table_cell">Judul Buku</TableCell>
              <TableCell className="table_cell">Nama Peminjam</TableCell>
              <TableCell className="table_cell">Status</TableCell>
              <TableCell className="table_cell">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((borrow, index) => (
              <TableRow key={borrow.id}>
                <TableCell className="table_cell"> {(page - 1) * 10 + index + 1}</TableCell>
                <TableCell className="table_cell">
                  {borrow.borrowing_start}
                </TableCell>
                <TableCell className="table_cell">
                  {borrow.borrowing_end}
                </TableCell>
                <TableCell className="table_cell">{borrow.book.title}</TableCell>
                <TableCell className="table_cell">{borrow.user.name}</TableCell>
                <TableCell className="table_cell">
                  <span
                    className={`text-white px-3 rounded-full p-1 ${borrow.status === "pending"
                      ? "bg-yellow-500"
                      : borrow.status === "accepted"
                        ? "bg-green-500"
                        : borrow.status === "completed"
                          ? "bg-blue-500"
                          : ""
                      }`}
                  >
                    {borrow.status}
                  </span>
                </TableCell>
                <TableCell className="table_cell">
                  {borrow.status === "pending" ? (
                    <Button
                      onClick={() => handleAccept(borrow.id)}
                      variant="outlined"
                      color="primary"
                      className="ml-2"
                    >
                      Terima
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleDetail(borrow)}
                      variant="contained"
                      color="info"
                      className="ml-2"
                    >
                      Detail
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={12}
                count={totalBooks}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {isAddModalOpen && <AddPeminjaman closeModal={closeAddModal} />}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isDetailModalOpen}
        onClose={handleCloseDetailModal} // Close modal when clicking outside the modal area
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isDetailModalOpen}>
          <div className="fixed inset-0 flex items-center justify-center" onClick={handleCloseDetailModal}>
            <div className="bg-white p-8 rounded-lg w-[30%]" onClick={(e) => e.stopPropagation()}>
              <Button variant="outlined" onClick={handleCloseDetailModal} className="absolute top-[-20px] right-[-5px] text-gray-500 hover:text-gray-700 focus:outline-none">
                Kembali
              </Button>
              <h2 className="text-xl font-bold mb-4">Detail Peminjaman</h2>
              {selectedBorrow && (
                <div className=" md:flex-row">
                  <div className="md:w-1/2 flex ">
                    <div className="bg-gray-100 p-4 rounded-md mb-4 ">
                      <p className="text-sm font-semibold">Nama Peminjam:</p>
                      <p>{selectedBorrow.user.name}</p>
                      <p className="text-sm font-semibold">Email:</p>
                      <p>{selectedBorrow.user.email}</p>
                      <p className="text-sm font-semibold">Status User:</p>
                      <p>{selectedBorrow.user.status}</p>
                    </div>
                    <div className="md:w-1/2 md:ml-8 ">
                      <div className="bg-gray-100 p-4 rounded-md mb-4 w-[200px]">
                        <p className="text-sm font-semibold">Judul Buku:</p>
                        <p>{selectedBorrow.book.title}</p>
                        <p className="text-sm font-semibold">Pengarang:</p>
                        <p>{selectedBorrow.book.writer}</p>
                        <p className="text-sm font-semibold">Tahun Terbit:</p>
                        <p>{selectedBorrow.book.published}</p>
                      </div>
                    </div>
                  </div>



                  <div className="md:w-1/2 md:ml-8 flex items-center w-full gap-5">
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <p className="text-sm font-semibold">Jumlah Buku Dipinjam:</p>
                      <p>{selectedBorrow.quantity}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <p className="text-sm font-semibold">Status:</p>
                      <p>{selectedBorrow.status}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <p className="text-sm font-semibold">Deadline:</p>
                      <p>{selectedBorrow.deadline}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default PeminjamanCompo;
