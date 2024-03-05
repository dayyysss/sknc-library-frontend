/* eslint-disable jsx-a11y/no-static-element-interactions */
import BookIcon from '@mui/icons-material/Book';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ColorContext } from '../../../../context/darkContext';
import './Sidebar.scss';
import { toast } from 'react-hot-toast';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

function Sidebar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    const handleLogout = () => {
        // Hapus token dari local storage
        localStorage.removeItem("token");
        // Tampilkan pemberitahuan logout berhasil di tengah layar
        toast.success("Logout berhasil!", {
          position: "top-center",
        });
        // Tunda pengalihan ke halaman login setelah 2 detik
        setTimeout(() => {
          window.location.href = "/";
        }, 2000); // Ubah angka 2000 menjadi jumlah milidetik yang Anda inginkan
      };

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/dashboard-pustakawan" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">SKANIC LIBRARY</h3>
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann menu1">Main</p>
                    <Link to="/dashboard-pustakawan" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann menu2">Data Master</p>
                    <Link to="/dashboard-pustakawan/data-buku" style={{ textDecoration: 'none' }}>
                        <li>
                            <BookIcon className="icon" /> Data Buku
                        </li>
                    </Link>

                    {/* <Link to="/dashboard-pustakawan/kategori-buku" style={{ textDecoration: 'none' }}>
                        <li>
                            <CollectionsBookmarkIcon className="icon" /> Kategori Buku
                        </li>
                    </Link> */}

                    <p className="spann menu3">Data Transaksi</p>
                    <Link to="/dashboard-pustakawan/peminjaman-buku" style={{ textDecoration: 'none' }}>
                        <li>
                            <BookmarkAddIcon className="icon" /> Peminjaman Buku
                        </li>
                    </Link>
                    <Link to="/dashboard-pustakawan/pengembalian-buku" style={{ textDecoration: 'none' }}>
                        <li>
                            <BookmarkRemoveIcon className="icon" /> Pengembalian Buku
                        </li>
                    </Link>
                    <Link to="/dashboard-pustakawan/denda" style={{ textDecoration: 'none' }}>
                        <li>
                            <ProductionQuantityLimitsIcon className="icon" /> Denda
                        </li>
                    </Link>
                    <li onClick={handleLogout}>
                        <LogoutIcon className="icon" /> Logout
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
