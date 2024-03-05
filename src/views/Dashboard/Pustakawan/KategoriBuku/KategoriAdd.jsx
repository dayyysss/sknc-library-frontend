/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import React, { useState } from 'react';
import Input from '../../../../components/Dashboard/Pustakawan/Input/Input';
import Navbar from '../../../../components/Dashboard/Pustakawan/Navbar/Navbar';
import Sidebar from '../../../../components/Dashboard/Pustakawan/Sidebar/Sidebar';
import noImage from '../../../../assets/ImagesNew/photo-camera.png';
import './Kategori.scss';

function KategoriAdd({ inputs, titlee, type }) {
    let dynamicInpVal;

    const [bookData, setBookData] = useState({
        bookName: '',
        publisher: '',
        isbn: '',
    });

    // dynamically change the state values
    switch (type) {
        case 'USER':
            dynamicInpVal = {
                username: '',
                name: '',
                email: '',
                password: '',
                address: '',
            };
            break;
        case 'PRODUCT':
            dynamicInpVal = {
                title: '',
                description: '',
                category: '',
                price: '',
                stock: '',
            };
            break;
        case 'BLOG':
            dynamicInpVal = {
                title: '',
                description: '',
                tags: '',
            };
            break;
        default:
            break;
    }
    const [userInp, setUserInp] = useState(dynamicInpVal);

    const [file, setFile] = useState('');

    const image = false;

    // Dynamicaly change the data for different pages

    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userInp);
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
                            <img src={file ? URL.createObjectURL(file) : noImage} alt="" />
                        </div>

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_inp">
                                <label htmlFor="file">
                                    Upload: <DriveFolderUploadIcon className="file_icon" />
                                </label>

                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <Input
                             name="bookName"
                             type="text"
                            placeholder="Masukkan nama buku"
                            onChange={handleChange}
                            value={bookData.bookName}
                            />
                            <Input
                             name="bookName"
                             type="text"
                            placeholder="Masukkan penerbit"
                            onChange={handleChange}
                            value={bookData.bookName}
                            />
                            <Input
                             name="bookName"
                             type="text"
                            placeholder="ISBN"
                            onChange={handleChange}
                            value={bookData.bookName}
                            />
                            <Input
                             name="bookName"
                             type="text"
                            placeholder="Masukkan "
                            onChange={handleChange}
                            value={bookData.bookName}
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

export default KategoriAdd;
