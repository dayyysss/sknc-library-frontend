import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import dummy image
import book1 from '../../../../assets/ImagesNew/book1.jpg';
import book2 from '../../../../assets/ImagesNew/book2.jpg';
import book3 from '../../../../assets/ImagesNew/book3.jpg';
import book4 from '../../../../assets/ImagesNew/book4.jpg';
import book5 from '../../../../assets/ImagesNew/book5.jpg';

// Replace this data with your own
const data = [
  {
    _id: 23423343,
    product: 'Programing Book 1',
    image: book1,
    customer: 'Devid John',
    date: '3 October, 2022',
    amount: 45,
    method: 'Online Payment',
    status: 'Approved',
  },
  {
    _id: 235343343,
    product: 'Programing Book 2',
    image: book2,
    customer: 'Julia Ani',
    date: '23 April, 2022',
    amount: 55,
    method: 'Cash On Delivery',
    status: 'Pending',
  },
  {
    _id: 234239873,
    product: 'Programing Book 3',
    image: book3,
    customer: 'John Smith',
    date: '10 October, 2022',
    amount: 25,
    method: 'Online Payment',
    status: 'Approved',
  },
  {
    _id: 23423143,
    product: 'Programing Book 4',
    image: book4,
    customer: 'Devid John',
    date: '3 March, 2022',
    amount: 40,
    method: 'Cash On Delivery',
    status: 'Approved',
  },
  {
    _id: 123423343,
    product: 'Programing Book 5',
    image: book5,
    customer: 'Humlar',
    date: '20 November, 2022',
    amount: 45,
    method: 'Online Payment',
    status: 'Approved',
  },
  {
    _id: 2333343,
    product: 'Programing Book 6',
    image: book2,
    customer: 'Devid John',
    date: '12 June, 2022',
    amount: 28,
    method: 'Cash On Delivery',
    status: 'Pending',
  },
];

const PengembalianCompo = () => {
  return (
    <div className='px-[25px] pt-[25px] pb-[370px] bg-[#F8F9FC]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer'>Pengembalian Buku</h1>
      </div>
      <TableContainer component={Paper} className="table_list mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table_cell">Tracking Id</TableCell>
              <TableCell className="table_cell">Product</TableCell>
              <TableCell className="table_cell">Customer</TableCell>
              <TableCell className="table_cell">Amount</TableCell>
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
                <TableCell className="table_cell">{row.amount}</TableCell>
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
  );
};

export default PengembalianCompo;
