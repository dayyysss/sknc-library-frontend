import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataBuku.scss';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2';

function DataBuku() {
    document.title = "Skanic Library - Data Buku";
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
        setIsModalOpen(true);
        setSelectedBook(bookId);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1); // MUI's TablePagination page starts from 0, so adding 1 to make it start from 1
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to the first page when rows per page changes
    };

    return (
        <div className="table-wrapper pb-20">
            <TableContainer component={Paper} className="table_list">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">No</TableCell>
                            <TableCell className="table_cell">Judul Buku</TableCell>
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
                                <TableCell className="table_cell">
                                    <span className={`rounded-full p-2 text-white ${book.stock_amount > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {book.stock_amount > 0 ? 'Tersedia' : 'Habis'}
                                    </span>
                                </TableCell>
                                <TableCell className="table_cell">
                                    <div className="flex justify-between items-center">
                                        <FaEdit
                                            onClick={() => handleUpdate(book.id)}
                                            className="text-white rounded-full cursor-pointer bg-blue-500 mr-1"
                                            style={{ fontSize: "1.4rem" }}
                                        />
                                        <RiDeleteBin5Line
                                            onClick={() => handleDelete(book.id)}
                                            className="text-white rounded-full cursor-pointer bg-red-500"
                                            style={{ fontSize: "1.4rem" }}
                                        />
                                    </div>
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
        </div>
    );
}

export default DataBuku;
