import React from 'react'

// mui table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import dummy image
import book1 from '../../../../assets/ImagesNew/book1.jpg';

const RiwayatA = () => {
    document.title = "Skanic Library - Riwayat Buku";
      // Replace this data with your own
      const data = [
        {
            _id: 23423343,
            product: 'Programing Book 1',
            image: book1,
            customer: 'Devid John',
            date: '3 October, 2022',
            ammount: 45,
            method: 'Online Payment',
            status: 'Approved',
        },
        ];
  return (
    <>
    <div className="px-[25px] pt-[25px] bg-[#F8F9FC] pb-[500px]">
      <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
        Riwayat Buku
      </h1>

      <TableContainer component={Paper} className="table_list mt-7">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table_cell">ISBN</TableCell>
                        <TableCell className="table_cell">Judul</TableCell>
                        <TableCell className="table_cell">Tanggal Meminjam</TableCell>
                        <TableCell className="table_cell">Ammount</TableCell>
                        <TableCell className="table_cell">Date</TableCell>
                        <TableCell className="table_cell">Payment Status</TableCell>
                        <TableCell className="table_cell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row" className="table_cell">
                                <div className="product_idd">
                                    <img src={row.image} alt="product" className="product_img" />
                                    {row._id}
                                </div>
                            </TableCell>
                            <TableCell className="table_cell">{row.product}</TableCell>
                            <TableCell className="table_cell">{row.customer}</TableCell>
                            <TableCell className="table_cell">{row.ammount}</TableCell>
                            <TableCell className="table_cell">{row.date}</TableCell>
                            <TableCell className="table_cell">{row.method}</TableCell>
                            <TableCell className="table_cell">
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  </>
  )
}

export default RiwayatA