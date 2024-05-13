import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Navbar from '../../../../components/Dashboard/Pustakawan/Navbar/Navbar';
import Sidebar from '../../../../components/Dashboard/Pustakawan/Sidebar/Sidebar';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import './Pengembalian.scss';


function PengembalianBuku({ type }) {
    document.title = "Skanic Library - Pengembalian Buku";
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

    return (
        <div className="blog_page">
            <Sidebar />

            <div className="blog_page_main">
                <Navbar />

                <div className="blog_page_table">
                    <div className="btnn">
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
                </div>
            </div>
        </div>
    );
}

export default PengembalianBuku;
    