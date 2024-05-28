import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AddPengembalian = ({ closeModal }) => {
  const [returnDate, setReturnDate] = useState('');
  const [status, setStatus] = useState('');
  const [borrowId, setBorrowId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [userName, setUserName] = useState('');
  const modalRef = useRef(null);

  const token = localStorage.getItem('token'); // Asumsikan token disimpan di localStorage

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, closeModal]);

  const handleBorrowIdChange = async (event) => {
    const id = event.target.value;
    setBorrowId(id);
    if (id) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/borrow/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const borrowData = response.data;

        // Contoh: Mengambil detail buku dan pengguna dari response
        setBookTitle(borrowData.book.title);
        setUserName(borrowData.user.name);
      } catch (error) {
        console.error('Failed to fetch borrow data:', error);
      }
    }
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/restore/returnmanual/${borrowId}`,
        {
          // method_: 'PUT',
          returndate: returnDate,
          status: status,
          borrow_id: borrowId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log('Pengembalian berhasil ditambahkan:', response.data);
      closeModal();
    } catch (error) {
      console.error('Gagal menambahkan pengembalian:', error);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Tambah Pengembalian</h2>
        <div className="space-y-4">
        <input
            type="date"
            value={returnDate}
            onChange={handleReturnDateChange}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="number"
            value={borrowId}
            onChange={handleBorrowIdChange}
            placeholder="Masukkan ID Peminjaman"
            className="border rounded px-3 py-2 w-full"
          />
    
          <select
            value={status}
            onChange={handleStatusChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Pilih Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Dikembalikan">Dikembalikan</option>
            <option value="Denda Belum Dibayar">Denda Belum Dibayar</option>
            <option value="Denda Dibayar">Denda Dibayar</option>
          </select>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300"
              onClick={handleCancel}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPengembalian;