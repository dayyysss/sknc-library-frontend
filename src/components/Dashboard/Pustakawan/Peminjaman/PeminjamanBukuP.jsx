import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PeminjamanBukuP.scss';

// mui table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from "@mui/material/TablePagination";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';

function PeminjamanBukuP() {
  document.title = "Skanic Library - Peminjaman Buku";
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
        console.log(data)
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

  const exportPDF = () => {
    // Placeholder for the export PDF functionality
    console.log("Export PDF clicked");
  };

  return (
    <div className="table-wrapper pb-20">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">Daftar Peminjaman</h2>
        <div className="space-x-2">
          <Button variant="contained" color="secondary" onClick={exportPDF}>
            Export PDF
          </Button>
          <Button variant="contained" color="primary" onClick={openAddModal}>
            Tambah Peminjaman
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} className="table_list">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table_cell">No</TableCell>
              <TableCell className="table_cell">Nama Peminjam</TableCell>
              <TableCell className="table_cell">Judul Buku</TableCell>
              <TableCell className="table_cell">Jumlah Buku</TableCell>
              <TableCell className="table_cell">Peminjaman Awal</TableCell>
              <TableCell className="table_cell">Tenggat</TableCell>
              <TableCell className="table_cell">Status</TableCell>
              <TableCell className="table_cell">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((borrow, index) => (
              <TableRow key={borrow.id}>
                <TableCell className="table_cell"> {(page - 1) * 10 + index + 1}</TableCell>
                <TableCell className="table_cell">{borrow.user.name}</TableCell>
                <TableCell className="table_cell">{borrow.book.title}</TableCell>
                <TableCell className="table_cell">{borrow.amount_borrowed}</TableCell>
                <TableCell className="table_cell">
                  {borrow.borrowing_start}
                </TableCell>
                <TableCell className="table_cell">
                  {borrow.borrowing_end}
                </TableCell>
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
                  {borrow.status !== "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleDetail(borrow)}
                        variant="contained"
                        color="info"
                      >
                        Detail
                      </Button>
                      <Button
                        onClick={() => handleDelete(borrow.id)} // Ganti handleDelete dengan fungsi untuk menghapus
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                  {borrow.status === "pending" && (
                    <Button
                      onClick={() => handleAccept(borrow.id)}
                      variant="outlined"
                      color="primary"
                      className="ml-2"
                    >
                      Terima
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {books.length === 0 && ( // Tambahkan kondisi untuk menampilkan pesan jika tidak ada data
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Tidak ada data peminjaman.
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
    </div>
  );
}

export default PeminjamanBukuP;
