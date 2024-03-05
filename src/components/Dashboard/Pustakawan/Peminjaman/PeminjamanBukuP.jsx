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
import Pagination from '@mui/material/Pagination';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2';

function PeminjamanBukuP() {
    document.title = "Skanic Library - Peminjaman Buku";
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const [selectedBook, setSelectedBook] = useState(null); // State to hold selected book for editing

    useEffect(() => {
        fetchData();
    }, [page]);
    
 // Frontend: PeminjamanBukuP.jsx

const fetchData = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not available. Please login.");
            return;
        }

        const response = await axios.get(
            `http://127.0.0.1:8000/api/borrow/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

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

    const handleUpdate = async (bookId) => {
        setIsModalOpen(true); // Open modal
        setSelectedBook(bookId); // Set selected book for editing
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <div className="table-wrapper pb-20">
            <TableContainer component={Paper} className="table_list">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">Id</TableCell>
                            <TableCell className="table_cell">Peminjaman Awal</TableCell>
                            <TableCell className="table_cell">Peminjaman Akhir</TableCell>
                            <TableCell className="table_cell">Status</TableCell>
                            <TableCell className="table_cell">Book ID</TableCell>
                            <TableCell className="table_cell">User ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((borrow, index) => (
                            <TableRow key={index}>
                                <TableCell className="table_cell">{borrow.id}</TableCell>
                                <TableCell className="table_cell">{borrow.borrowing_start}</TableCell>
                                <TableCell className="table_cell">{borrow.borrowing_end}</TableCell>
                                <TableCell className="table_cell">{borrow.status}</TableCell>
                                <TableCell className="table_cell">{borrow.book_id}</TableCell>
                                <TableCell className="table_cell">{borrow.user_id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={12}>
                                <div className="pagination-wrapper pt-6">
                                    <Pagination count={totalPages} page={page} onChange={handleChangePage} />
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PeminjamanBukuP;
