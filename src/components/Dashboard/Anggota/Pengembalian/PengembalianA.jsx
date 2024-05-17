import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const PengembalianA = () => {
    document.title = 'Skanic Library - Pengembalian Buku';

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = getAuthToken();
            const user_id = getUserId();
            if (!token || !user_id) {
                console.error('Token or user_id not available. Please login.');
                return;
            }

            const response = await axios.get(
                `http://127.0.0.1:8000/api/restore/${user_id}/index-restore`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const responseData = response.data['List Data Pengembalian User'];
            setData(responseData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getAuthToken = () => {
        return localStorage.getItem('token');
    };

    const getUserId = () => {
        return localStorage.getItem('user_id');
    };

    return (
        <div className="px-[25px] pt-[25px] bg-[#F8F9FC] pb-[500px]">
            <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
                Buku Yang Belum Dikembalikan
            </h1>

            <TableContainer component={Paper} className="table_list mt-7">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">No</TableCell>
                            <TableCell className="table_cell">Tanggal Pengembalian</TableCell>
                            <TableCell className="table_cell">Status</TableCell>
                            <TableCell className="table_cell">Denda</TableCell>
                            <TableCell className="table_cell">Buku</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((pengembalian, index) => (
                                <TableRow key={index}>
                                    <TableCell className="table_cell">{index + 1}</TableCell>
                                    <TableCell className="table_cell">{pengembalian.return_date}</TableCell>
                                    <TableCell className="table_cell">{pengembalian.status}</TableCell>
                                    <TableCell className="table_cell">{pengembalian.fine}</TableCell>
                                    <TableCell className="table_cell">{pengembalian.borrow.book.title}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PengembalianA;
