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

const PengembalianA = () => {
    document.title = "Skanic Library - Pengembalian Buku";
      // Replace this data with your own
      const data = [
        {
            _id: 1,
            product: '11/03/2024',
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
        Buku Yang Di Belum Di Kembalikan
      </h1>

      <TableContainer component={Paper} className="table_list mt-7">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table_cell">Id</TableCell>
                        <TableCell className="table_cell">Tanggal Pengembalian</TableCell>
                        <TableCell className="table_cell">Status</TableCell>
                        <TableCell className="table_cell">Fine</TableCell>
                        <TableCell className="table_cell">Buku</TableCell>
                        <TableCell className="table_cell">User</TableCell>
                        <TableCell className="table_cell">Peminjman</TableCell>
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

export default PengembalianA