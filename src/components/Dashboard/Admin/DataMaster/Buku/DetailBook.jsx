import React, { useState } from 'react';

const DetailBook = ({ book }) => {
  const getStatusColor = (status) => {
    return status === 'available' ? 'text-green-600' : 'text-red-600';
  };

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${isModalOpen ? 'block' : 'hidden'}`}>
      <h2 className="text-center text-2xl font-bold mb-6">{book.title}</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <img src={book.image} alt={book.title} className="h-64 w-auto object-contain mx-auto" />
        </div>
        <div className="md:w-1/2 text-left">
          <p><span className="font-semibold">Synopsis:</span> {book.synopsis}</p>
          <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
          <p><span className="font-semibold">Penulis:</span> {book.writer}</p>
          <p><span className="font-semibold">Jumlah Halaman:</span> {book.page_amount}</p>
          <p><span className="font-semibold">Stok Buku:</span> {book.stock_amount}</p>
          <p><span className="font-semibold">Diterbitkan:</span> {book.published}</p>
          <p><span className="font-semibold">Kategori:</span> {book.category}</p>
          <p className="flex items-center"><span className="font-semibold mr-2">Status:</span> <span className={getStatusColor(book.status)}>{book.status}</span></p>
          <div className='mt-4 flex'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">Hapus</button>
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Batal</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
