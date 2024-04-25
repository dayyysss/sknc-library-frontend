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
import Pagination from "@mui/material/Pagination";
import Swal from "sweetalert2";
import { MdOutlineCheckBox } from "react-icons/md";

const PeminjamanCompo = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not available. Please login.");
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/api/borrow/`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      const token = localStorage.getItem("token");
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
  
      if (response.data.success) {
        // Jika berhasil, panggil fetchData untuk memperbarui data
        fetchData();
        Swal.fire({
          title: "Accepted!",
          text: "Peminjaman Berhasil!",
          icon: "success",
        }).then(() => {
          // Tambahkan alert data berhasil diterima di sini
          alert("Data berhasil diterima");
        });
      }
    } catch (error) {
      console.error("Error accepting borrow:", error);
    }
  };  

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div className="px-[25px] pt-[25px] pb-[370px] bg-[#F8F9FC]">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
          Peminjaman Buku
        </h1>
      </div>
      <TableContainer component={Paper} className="table_list mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table_cell">No</TableCell>
              <TableCell className="table_cell">Peminjaman Awal</TableCell>
              <TableCell className="table_cell">Peminjaman Akhir</TableCell>
              <TableCell className="table_cell">Status</TableCell>
              <TableCell className="table_cell">Buku</TableCell>
              <TableCell className="table_cell">Peminjam</TableCell>
              <TableCell className="table_cell">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((borrow, index) => (
              <TableRow key={borrow.id}>
                <TableCell className="table_cell">{index + 1}</TableCell>
                <TableCell className="table_cell">{borrow.borrowing_start}</TableCell>
                <TableCell className="table_cell">{borrow.borrowing_end}</TableCell>
                <TableCell className="table_cell" style={{ color: borrow.status === 'pending' ? 'yellow' : borrow.status === 'accepted' ? 'green' : 'inherit' }}>{borrow.status}</TableCell>
                <TableCell className="table_cell">{borrow.book.title}</TableCell>
                <TableCell className="table_cell">{borrow.user.name}</TableCell>
                <TableCell className="table_cell">
                  {borrow.status !== "accepted" && (
                    <MdOutlineCheckBox
                      onClick={() => handleAccept(borrow.id)}
                      className="text-blue-500 cursor-pointer ml-2"
                      style={{ fontSize: "1.4rem" }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={12}>
                <div className="pagination-wrapper pt-6">
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PeminjamanCompo;
