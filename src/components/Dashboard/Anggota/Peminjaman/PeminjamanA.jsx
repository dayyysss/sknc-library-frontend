import React, { useState, useEffect } from "react";
import axios from "axios";

// Import MUI components
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const PeminjamanA = () => {
    document.title = "Skanic Library - Peminjaman Buku";

    const [data, setData] = useState([]); // State untuk menyimpan data peminjaman

    useEffect(() => {
        fetchData(); // Panggil fetchData saat komponen dimuat
    }, []);

    const fetchData = async () => {
        try {
            const token = getAuthToken(); // Ambil token dari localStorage
            const user_id = getUserId(); // Ambil user_id dari localStorage atau sumber data lainnya
            if (!token || !user_id) {
                console.error("Token or user_id not available. Please login.");
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
                setData(response.data.data); // Simpan data peminjaman dalam state
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getAuthToken = () => {
        const token = localStorage.getItem("token");
        return token;
    };

    const getUserId = () => {
        const user_id = localStorage.getItem("user_id");
        return user_id;
    };

    // Dummy data
    const dummyData = [
        {
            _id: 1,
            borrowing_start: '04/03/2024',
            borrowing_end: '11/03/2024',
            status: 'Accepted',
        },
        {
            _id: 2,
            borrowing_start: '04/03/2024',
            borrowing_end: '11/03/2024',
            status: 'Pending',
        },
    ];

    return (
        <>
            {/* Konten Peminjaman Buku */}
            <div className="px-[25px] pt-[25px] bg-[#F8F9FC] pb-[500px]">
                <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
                    Buku Yang Di Pinjam
                </h1>

                <TableContainer component={Paper} className="table_list mt-7">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table_cell">Id</TableCell>
                                <TableCell className="table_cell">Peminjaman Awal</TableCell>
                                <TableCell className="table_cell">
                                    Peminjaman Berakhir
                                </TableCell>
                                <TableCell className="table_cell">Status</TableCell>
                                <TableCell className="table_cell">Buku</TableCell>
                                <TableCell className="table_cell">Peminjam</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dummyData.map((borrow) => (
                                <TableRow key={borrow._id}>
                                    <TableCell className="table_cell">
                                        {borrow._id}
                                    </TableCell>
                                    <TableCell className="table_cell">
                                        {borrow.borrowing_start}
                                    </TableCell>
                                    <TableCell className="table_cell">
                                        {borrow.borrowing_end}
                                    </TableCell>
                                    <TableCell className="table_cell">
                                        {borrow.status}
                                    </TableCell>
                                    <TableCell className="table_cell">
                                        {/* Anda dapat menambahkan detail buku di sini */}
                                    </TableCell>
                                    <TableCell className="table_cell">
                                        {borrow.customer}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default PeminjamanA;
