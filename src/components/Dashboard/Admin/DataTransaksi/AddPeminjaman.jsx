import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AddPeminjaman = ({ closeModal }) => {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

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

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleBookChange = (event) => {
    setBookId(event.target.value);
  };

  const handleUserChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/borrow/create',
        {
          book_id: bookId,
          user_id: userId,
        }
      );
      console.log('Peminjaman berhasil ditambahkan:', response.data);
      closeModal();
    } catch (error) {
      console.error('Gagal menambahkan peminjaman:', error);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Tambah Peminjaman</h2>
        <div className="space-y-4">
          <select
            value={bookId}
            onChange={handleBookChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Pilih Judul Buku</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
          <select
            value={userId}
            onChange={handleUserChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Pilih Nama Peminjam</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
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

export default AddPeminjaman;
