import React from 'react'

const DetailBook = ({ book }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.synopsis}</p>
      {/* Tambahkan detail buku lainnya sesuai kebutuhan */}
    </div>
  )
}

export default DetailBook
