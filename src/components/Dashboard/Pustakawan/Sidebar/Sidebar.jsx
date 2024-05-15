import BookIcon from '@mui/icons-material/Book';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ColorContext } from '../../../../context/darkContext';
import './Sidebar.scss';
import { toast } from 'react-hot-toast';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

function Sidebar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);
    
    // State untuk menyimpan menu yang aktif
    const [activeMenu, setActiveMenu] = useState('dashboard');

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

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
        } catch (error) {
            toast.error("Logout gagal!", {
                position: "top-center",
            });
        }
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
                        <li className={activeMenu === 'dashboard' ? 'active' : ''} onClick={() => handleMenuClick('dashboard')}>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann menu2">Data Master</p>
                    <Link to="/dashboard-pustakawan/data-buku" style={{ textDecoration: 'none' }}>
                        <li className={activeMenu === 'data-buku' ? 'active' : ''} onClick={() => handleMenuClick('data-buku')}>
                            <BookIcon className="icon" /> Data Buku
                        </li>
                    </Link>
                    <Link to="/dashboard-pustakawan/buku-tamu" style={{ textDecoration: 'none' }}>
                        <li className={activeMenu === 'buku-tamu' ? 'active' : ''} onClick={() => handleMenuClick('buku-tamu')}>
                            <LocalLibraryIcon className="icon" /> Buku Tamu
                        </li>
                    </Link>

                    {/* <Link to="/dashboard-pustakawan/kategori-buku" style={{ textDecoration: 'none' }}>
                        <li>
                            <CollectionsBookmarkIcon className="icon" /> Kategori Buku
                        </li>
                    </Link> */}

                    <p className="spann menu3">Data Transaksi</p>
                    <Link to="/dashboard-pustakawan/peminjaman-buku" style={{ textDecoration: 'none' }}>
                        <li className={activeMenu === 'peminjaman-buku' ? 'active' : ''} onClick={() => handleMenuClick('peminjaman-buku')}>
                            <BookmarkAddIcon className="icon" /> Peminjaman Buku
                        </li>
                    </Link>
                    <Link to="/dashboard-pustakawan/pengembalian-buku" style={{ textDecoration: 'none' }}>
                        <li className={activeMenu === 'pengembalian-buku' ? 'active' : ''} onClick={() => handleMenuClick('pengembalian-buku')}>
                            <BookmarkRemoveIcon className="icon" /> Pengembalian Buku
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
