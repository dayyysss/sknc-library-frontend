import React, { useState } from 'react';
import Input from '../../../../components/Dashboard/Pustakawan/Input/Input';
import Navbar from '../../../../components/Dashboard/Pustakawan/Navbar/Navbar';
import Sidebar from '../../../../components/Dashboard/Pustakawan/Sidebar/Sidebar';
import noImage from '../../../../assets/images/uploadimage.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import './New.scss';

function BookAdd() {
    const [bookData, setBookData] = useState({
        title: '',
        synopsis: '',
        isbn: '',
        writer: '',
        page_amount: '',
        stock_amount: '',
        published: '',
        category: '',
        image: null,
    });

    const [file, setFile] = useState('');

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setBookData({ ...bookData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('synopsis', bookData.synopsis);
        formData.append('isbn', bookData.isbn);
        formData.append('writer', bookData.writer);
        formData.append('page_amount', bookData.page_amount);
        formData.append('stock_amount', bookData.stock_amount);
        formData.append('published', bookData.published);
        formData.append('category', bookData.category);
        formData.append('image', bookData.image);

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/book/create-1',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${getAuthToken()}`,
                    },
                }
            );

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Buku berhasil ditambahkan',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    // Redirect to book list page
                    // You may need to replace the path '/dashboard-admin/buku' with the appropriate path
                    navigate("/dashboard-pustakawan/data-buku");
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Gagal menambahkan buku',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan saat menambahkan buku',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const getAuthToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not available. Please login.');
            return null;
        }
        return token;
    };

    return (
        <div className="add_new">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <div className="image">
                            <p className="add_new_user">Tambah Data Buku</p>
                            <img
                                src={file ? URL.createObjectURL(file) : noImage}
                                alt=""
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_inp">
                                <label htmlFor="file">
                                    Sampul Buku:{' '}
                                    <DriveFolderUploadIcon className="file_icon" /> {/* Use DriveFolderUploadIcon here */}
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        style={{ display: 'none' }}
                                        onChange={handleFileUpload}
                                    />
                                </label>
                            </div>
                            <Input
                                name="title"
                                type="text"
                                placeholder="Masukkan nama buku"
                                onChange={handleChange}
                                value={bookData.title}
                            />
                            <Input
                                name="synopsis"
                                type="text"
                                placeholder="Masukkan sinopsis singkat"
                                onChange={handleChange}
                                value={bookData.synopsis}
                            />
                            <Input
                                name="isbn"
                                type="text"
                                placeholder="Masukkan no isbn buku"
                                onChange={handleChange}
                                value={bookData.isbn}
                            />
                            <Input
                                name="writer"
                                type="text"
                                placeholder="Masukkan penulis buku"
                                onChange={handleChange}
                                value={bookData.writer}
                            />
                            <Input
                                name="page_amount"
                                type="text"
                                placeholder="Masukkan jumlah halaman buku"
                                onChange={handleChange}
                                value={bookData.page_amount}
                            />
                            <Input
                                name="stock_amount"
                                type="text"
                                placeholder="Masukkan stok buku"
                                onChange={handleChange}
                                value={bookData.stock_amount}
                            />
                            <Input
                                name="published"
                                type="text"
                                placeholder="Masukkan tahun terbit buku"
                                onChange={handleChange}
                                value={bookData.published}
                            />
                            <Input
                                name="category"
                                type="text"
                                placeholder="Masukkan kategori buku"
                                onChange={handleChange}
                                value={bookData.category}
                            />
                            <button type="submit" className="submit_btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookAdd;