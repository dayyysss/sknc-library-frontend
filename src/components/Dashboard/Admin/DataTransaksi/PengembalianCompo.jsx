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
import { FaFilePdf } from "react-icons/fa";
import AddPeminjaman from "./AddPeminjaman";

const PengembalianCompo = () => {
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

      const response = await axios.get(`http://127.0.0.1:8000/api/restore/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          per_page: rowsPerPage,
          q: searchQuery,
        },
      });

      if (response.data.success) {
        const { data, last_page, total } = response.data;
        setBooks(data); // Mengatur data pengembalian
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
    // Copy the selectedBorrow object to avoid mutating the original state
    const updatedBorrow = { ...borrow };

    // Mengambil tanggal deadline dari selectedBorrow
    const deadline = new Date(updatedBorrow.borrowing_end);

    // Menghitung perbedaan antara tanggal akhir dan tanggal awal
    const borrowingStart = new Date(updatedBorrow.borrowing_start);
    const differenceInDays = Math.ceil((deadline - borrowingStart) / (1000 * 60 * 60 * 24));

    // Mengurangi jumlah hari yang diinginkan dari tanggal akhir
    const newDeadline = new Date(deadline);
    newDeadline.setDate(deadline.getDate() - differenceInDays);

    // Menyimpan tanggal deadline yang telah diubah kembali ke selectedBorrow
    updatedBorrow.deadline = newDeadline.toISOString().slice(0, 10);

    setSelectedBorrow(updatedBorrow);
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

  const handleDetailClick = (id) => {
    fetchDetail(id);
  };

  const generatePdf = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/api/restore/generateRestorePdf', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important for handling PDF response
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'PengembalianReport.pdf'); // or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
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
        await axios.delete(`http://127.0.0.1:8000/api/restore/${id}`, {
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
      console.error("error hapus peminjaman:", error);
    }
  };

  return (
    <div className="px-[25px] pt-[25px] pb-[370px] bg-[#F8F9FC]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
            Pengembalian Buku
          </h1>
        </div>
        <div className="flex items-center">
          <TextField
            label="Cari data pengembalian.."
            variant="outlined"
            size="small"
            className="px-4 py-2 mr-4 rounded"
            value={searchQuery}
            onChange={handleSearchChange}
          />
                    <button
            onClick={generatePdf}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 ml-4 flex items-center"
          >
            <FaFilePdf className="mr-2" />
            Generate Pengembalian
          </button>
          {/* <button
            onClick={openAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 ml-4"
          >
            Tambah Pengembalian
          </button> */}
        </div>
      </div>
      <TableContainer component={Paper} className="table_list mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table_cell">No</TableCell>
              <TableCell className="table_cell">Nama Peminjam</TableCell>
              <TableCell className="table_cell">Judul Buku</TableCell>
              <TableCell className="table_cell">Tanggal Pengembalian</TableCell>
              <TableCell className="table_cell">Status</TableCell>
              <TableCell className="table_cell">Denda</TableCell>
              <TableCell className="table_cell">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(books.data) && books.data.length > 0 ? (
              books.data.map((pengembalian, index) => (
                <TableRow key={pengembalian.id}>
                  <TableCell className="table_cell">
                    {(books.current_page - 1) * books.per_page + index + 1}
                  </TableCell>
                  <TableCell className="table_cell">{pengembalian.user.name}</TableCell>
                  <TableCell className="table_cell">{pengembalian.book.title}</TableCell>
                  <TableCell className="table_cell">{pengembalian.returndate}</TableCell>
                  <TableCell className="table_cell">{pengembalian.status}</TableCell>
                  <TableCell className="table_cell">{pengembalian.fine}</TableCell>
                  <TableCell className="table_cell">
                    <div className="flex space-x-2">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleDetailClick(pengembalian.id)}
                      >
                        Detail
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(pengembalian.id)} // Tambahkan fungsi handleDelete untuk menghapus data
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Tidak ada data pengembalian.
                </TableCell>
              </TableRow>
            )}
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
              <Button variant="outlined" onClick={handleCloseDetailModal} className="absolute top-[-15px] right-[-5px] text-gray-500 hover:text-gray-700 focus:outline-none">
                Kembali
              </Button>
              <h2 className="text-xl font-bold mb-4">Detail Peminjaman</h2>
              {selectedBorrow && (
                // flex 1
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
                  {/* flex 2 */}
                  <div className="md:w-1/2 md:ml-8 flex items-center w-full gap-5">
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <p className="text-sm font-semibold">Jumlah Buku Dipinjam:</p>
                      <p>{selectedBorrow.amount_borrowed}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <p className="text-sm font-semibold">Status:</p>
                      <p className=" rounded-full p-1 bg-green-500 px-4 text-white">{selectedBorrow.status}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <p className="text-sm font-semibold">Deadline:</p>
                      <p>{selectedBorrow.deadline}</p>
                    </div>
                  </div>
                  {/* flex 3 */}
                  <div className="md:w-1/2 md:ml-8 flex items-center w-full gap-5">
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <p className="text-sm font-semibold">Awal Peminjaman:</p>
                      <p>{selectedBorrow.borrowing_start}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <p className="text-sm font-semibold">Batas Waktu Pengembalian:</p>
                      <p>{selectedBorrow.borrowing_end}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </div >
  );
};

export default PengembalianCompo;
