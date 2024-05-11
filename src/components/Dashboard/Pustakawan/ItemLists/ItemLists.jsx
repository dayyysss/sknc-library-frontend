import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './itemlists.scss';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import BookIcon from '@mui/icons-material/Book';
import axios from 'axios';

function ItemLists({ type }) {
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalTamu, setTotalTamu] = useState(0);
    const [totalPeminjaman, setTotalPeminjaman] = useState(0);
    const [totalPengembalian, setTotalPengembalian] = useState(0);

    const getAuthToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not available. Please login.");
          return null;
        }
        return token;
      };

    useEffect(() => {
        fetchDataBuku();
        fetchDataTamu();
        fetchDataPengembalian();
        fetchDataPeminjaman();
    }, []);

    const fetchDataBuku = async () => {
        try {
          const responseBook = await axios.get('http://127.0.0.1:8000/api/book/', {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          });
          setTotalBooks(responseBook.data.data.total);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const fetchDataTamu = async () => {
        try {
          const responseTamu = await axios.get('http://127.0.0.1:8000/api/guestbook/', {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          });
          setTotalTamu(responseTamu.data.data.total);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const fetchDataPeminjaman = async () => {
        try {
          const responsePeminjaman = await axios.get('http://127.0.0.1:8000/api/borrow/', {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          });
          setTotalPeminjaman(responsePeminjaman.data.data.total);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const fetchDataPengembalian = async () => {
        try {
          const responsePengembalian = await axios.get('http://127.0.0.1:8000/api/restore/', {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          });
          setTotalPengembalian(responsePengembalian.data.data.total);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    let data;

    switch (type) {
        case 'data-buku':
            data = {
                title: 'Jumlah Buku',
                count: totalBooks,
                icon: (
                    <BookIcon
                        style={{
                            color: '#FF74B1',
                            backgroundColor: '#FFD6EC',
                        }}
                        className="icon"
                    />
                ),
                link: 'Lihat semua data buku',
                linkto: '/dashboard-pustakawan/data-buku',
            };
            break;
        case 'peminjaman-buku':
            data = {
                title: 'Jumlah Tamu',
                count: totalTamu,

                icon: (
                    <LocalLibraryIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#FFF38C',
                        }}
                        className="icon"
                    />
                ),
                link: 'Lihat semua peminjaman',
                linkto: '/dashboard-pustakawan/peminjaman-buku',
            };
            break;
        case 'pengembalian-buku':
            data = {
                title: 'Jumlah Peminjaman',
                count: totalPeminjaman,
                icon: (
                    <BookmarkAddIcon
                        style={{
                            color: '#367E18',
                            backgroundColor: '#A7FFE4',
                        }}
                        className="icon"
                    />
                ),
                link: 'Lihat semua pengembalian',
                linkto: '/dashboard-pustakawan/pengembalian-buku',
            };
            break;
        case 'denda':
            data = {
                title: 'Jumlah Pengembalian',
                count: totalPengembalian,
                icon: (
                    <BookmarkRemoveIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#B1B2FF',
                        }}
                        className="icon"
                    />
                ),
                link: 'Lihat semua denda',
                linkto: '/',
            };
            break;
        default:
            break;
    }

    return (
        <div className="item_listss">
            <div className="name">
                <p>{data.title}</p>
                <span className="persentage positive">
                    <KeyboardArrowUpIcon />
                    20 %
                </span>
            </div>

            <div className="counts">
                {data.isMoney && <AttachMoneyOutlinedIcon />}
                {data.count}
            </div>

            <div className="see_item">
                <Link to={data.linkto}>
                    <p>{data.link}</p>
                </Link>
                {data.icon}
            </div>
        </div>
    );
}

export default ItemLists;
