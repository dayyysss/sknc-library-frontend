import React from 'react'
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './views/Landing/Landing'
import Login from './views/Auth/Login'
import Register from './views/Auth/Register'
import NotFound from './views/NotFound'
import Cookies from 'js-cookie';

// // Import PrivateRoute component
// import PrivateRoute from './context/privateRoute';

// Dashboard Admin
import HomeAdmin from './components/Dashboard/Admin/Home/HomeAdmin';

import ListAdmin from './views/Dashboard/Admin/DataMaster/Admin/AdminList'
import TambahAdmin from './views/Dashboard/Admin/DataMaster/Admin/AddAdmin'

import ListPustakawan from './views/Dashboard/Admin/DataMaster/Pustakawan/PustakawanList'
import TambahPustakawan from './views/Dashboard/Admin/DataMaster/Pustakawan/AddPustakawan'

import ListAnggota from './views/Dashboard/Admin/DataMaster/Users/UserList'
import TambahAnggota from './views/Dashboard/Admin/DataMaster/Users/AddUser'

import ListBook from './views/Dashboard/Admin/DataMaster/Buku/BookList'
import TambahBuku from './views/Dashboard/Admin/DataMaster/Buku/AddBook'

import KategoriBook from './views/Dashboard/Admin/DataMaster/Kategori/KategoriList'
import TambahKategori from './views/Dashboard/Admin/DataMaster/Kategori/AddKategori'

import TransPeminjaman from './views/Dashboard/Admin/DataTransaksi/PeminjamanBuku'
import TransPengembalian from './views/Dashboard/Admin/DataTransaksi/PengembalianBuku'
import TransDenda from './views/Dashboard/Admin/DataTransaksi/Denda'

// Dashboard Pustakawan
import { ColorContext } from './context/darkContext';
import HomePustakawan from './components/Dashboard/Pustakawan/Home/Home';
import ListBooks from './views/Dashboard/Pustakawan/DataBuku/BooksList'
import TambahBukuP from './views/Dashboard/Pustakawan/DataBuku/BookAdd'
import ListKategori from './views/Dashboard/Pustakawan/KategoriBuku/ListKategori'
// import TambahKategoriP from './views/Dashboard/Pustakawan/KategoriBuku/KategoriAdd'
import PeminjamanBuku from './views/Dashboard/Pustakawan/Peminjaman/PeminjamanBuku'
import PengembalianBuku from './views/Dashboard/Pustakawan/Pengembalian/PengembalianBuku'
import ProfilePustakawan from './views/Dashboard/Pustakawan/Profile/Profile'
import DendaPustakawan from './views/Dashboard/Pustakawan/Denda/DendaP'
import './app.scss'

// Dashboard Anggota
import HomeAnggota from './components/Dashboard/Anggota/Home/HomeAnggota'
import DaftarBukuA from './views/Dashboard/Anggota/DaftarBuku/DaftarBukuA'
import PeminjamanBukuA from './views/Dashboard/Anggota/Peminjaman/PeminjamanA'
import PengembalianBukuA from './views/Dashboard/Anggota/Pengembalian/PengembalianA'
import RiwayatBukuA from './views/Dashboard/Anggota/Riwayat/RiwayatA'
import DendaA from './views/Dashboard/Anggota/Denda/DendaA'
import ProfileAnggota from './views/Dashboard/Anggota/Profile/ProfileA'

function App() {
    // color state management using react context
    const { darkMode } = useContext(ColorContext);

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing title="Landing" />} />

                    <Route path="/login" element={<Login title="Login" />} />
                    <Route path="/register" element={<Register title="Register" />} />

                    {/* Start Dashboard Admin */}
                    <Route path="/dashboard-admin">
                        <Route index element={<HomeAdmin />} />
                        {/* nested routes */}
                        {/* <Route path="admin/*" element={<ListAdmin type="admin" />} />
                        <Route path="/dashboard-admin/admin/add-admin/*" element={<TambahAdmin type="admin" />} />

                        <Route path="pustakawan/*" element={<ListPustakawan type="pustakawan" />} />
                        <Route path="/dashboard-admin/pustakawan/add-pustakawan/*" element={<TambahPustakawan type="pustakawan" />} /> */}

                        <Route path="manajemen-user/*" element={<ListAnggota type="user" />} />
                        <Route path="user/tambah-user/*" element={<TambahAnggota type="user" />} />

                        <Route path="buku/*" element={<ListBook type="buku" />} />
                        <Route path="/dashboard-admin/buku/add-buku/*" element={<TambahBuku type="buku" />} />
{/* 
                        <Route path="kategori/*" element={<KategoriBook type="kategori" />} />
                        <Route path="/dashboard-admin/kategori/add-kategori/*" element={<TambahKategori type="pustakawan" />} /> */}

                        <Route path="peminjaman/*" element={<TransPeminjaman type="peminjaman" />} />
                        <Route path="pengembalian/*" element={<TransPengembalian type="pengembalian" />} />
                        <Route path="denda/*" element={<TransDenda type="denda" />} />
                    </Route>
                    {/*  End Dashboard Admin */}


                    {/* Start Dashboard Pustakawan */}
                    <Route path="/dashboard-pustakawan">
                        <Route index element={<HomePustakawan />} />
                        {/* nested routes */}
                        <Route path="/dashboard-pustakawan/profile" element={<ProfilePustakawan type="profile" />} />
                        <Route path="data-buku/*" element={<ListBooks type="buku" />} />
                        <Route path="/dashboard-pustakawan/data-buku/tambah-buku/*" element={<TambahBukuP type="buku" />} />

                        <Route path="kategori-buku/*" element={<ListKategori type="kategori" />} />
                        <Route path="/dashboard-pustakawan/kategori-buku/tambah-kategori/*" element={<ListBooks type="buku" />} />

                        <Route path="peminjaman-buku/*" element={<PeminjamanBuku type="peminjaman" />} />
                        <Route path="pengembalian-buku/*" element={<PengembalianBuku type="pengembalian" />} />
                        <Route path="denda/*" element={<DendaPustakawan type="denda" />} />
                    </Route>
                    {/* End Dashboard Pustakawan */}

                    {/* Start Dashboard Aggota */}
                    <Route path="/dashboard-anggota">
                        <Route index element={<HomeAnggota />} />
                        {/* nested routes */}
                        <Route path="/dashboard-anggota/profile" element={<ProfileAnggota type="profile" />} />
                        <Route path="daftar-buku/*" element={<DaftarBukuA type="buku" />} />
                        <Route path="peminjaman-buku/*" element={<PeminjamanBukuA type="buku" />} />
                        <Route path="pengembalian-buku/*" element={<PengembalianBukuA type="kategori" />} />
                        <Route path="riwayat-buku/*" element={<RiwayatBukuA type="peminjaman" />} />
                        <Route path="denda/*" element={<DendaA type="pengembalian" />} />
                    <Route path="*" element={<NotFound />} />
                    </Route>
                    {/* End Dashboard Anggota */}

                </Routes>
            </Router>
        </div>
    )
}

export default App