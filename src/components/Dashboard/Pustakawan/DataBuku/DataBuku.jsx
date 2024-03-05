import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataBuku.scss';

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

function TableList() {
    document.title = "Skanic Library - Data Buku";
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const [selectedBook, setSelectedBook] = useState(null); // State to hold selected book for editing

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
                            <TableCell className="table_cell">No</TableCell>
                            <TableCell className="table_cell">Nama Buku</TableCell>
                            <TableCell className="table_cell">Sinopsis</TableCell>
                            <TableCell className="table_cell">ISBN</TableCell>
                            <TableCell className="table_cell">Penulis</TableCell>
                            <TableCell className="table_cell">Jumlah Halaman</TableCell>
                            <TableCell className="table_cell">Stok Buku</TableCell>
                            <TableCell className="table_cell">Tahun Terbit</TableCell>
                            <TableCell className="table_cell">Kategori</TableCell>
                            <TableCell className="table_cell">Sampul Buku</TableCell>
                            <TableCell className="table_cell">Status</TableCell>
                            <TableCell className="table_cell">Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" className="table_cell">{(page - 1) * 5 + index + 1}</TableCell>
                                <TableCell className="table_cell">{book.title}</TableCell>
                                <TableCell className="table_cell">{book.synopsis}</TableCell>
                                <TableCell className="table_cell">{book.isbn}</TableCell>
                                <TableCell className="table_cell">{book.writer}</TableCell>
                                <TableCell className="table_cell">{book.page_amount}</TableCell>
                                <TableCell className="table_cell">{book.stock_amount}</TableCell>
                                <TableCell className="table_cell">{book.published}</TableCell>
                                <TableCell className="table_cell">{book.category}</TableCell>
                                <TableCell className="table_cell">
                                    <img src={book.image} alt={book.title} className='w-auto mx-auto object-cover' />
                                </TableCell>
                                <TableCell className="table_cell">{book.status}</TableCell>
                                <TableCell className="table_cell">
                                    <div className="flex justify-between items-center">
                                        <FaEdit
                                            onClick={() => handleUpdate(book.id)}
                                            className="text-blue-500 cursor-pointer"
                                            style={{ fontSize: "1.4rem" }}
                                        />
                                        <RiDeleteBin5Line
                                            onClick={() => handleDelete(book.id)}
                                            className="text-red-500 cursor-pointer"
                                            style={{ fontSize: "1.4rem" }}
                                        />
                                    </div>
                                </TableCell>
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

export default TableList;
