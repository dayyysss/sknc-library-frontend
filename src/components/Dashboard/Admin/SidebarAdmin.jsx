import React, { useState } from 'react';
import { FaTachometerAlt, FaUserTie, FaStickyNote, FaRegChartBar, FaRegCalendarAlt, FaChevronRight, FaChevronLeft, FaBook, FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoBookmarks } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { FaBookReader } from "react-icons/fa";

const SidebarAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk melacak apakah sidebar terbuka atau tertutup
  const [activeSidebar, setActiveSidebar] = useState(null); // State untuk melacak menu sidebar yang sedang aktif

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Mengubah status sidebar saat diklik
  };

  const handleSidebarClick = (sidebar) => {
    setActiveSidebar(sidebar === activeSidebar ? null : sidebar); // Mengatur menu sidebar yang sedang aktif saat diklik
  };

  return (
    <div className={`bg-[#4E73DF] px-[25px] h-screen ${isSidebarOpen ? '' : 'w-[50px]'} transition-all`}>
      {/* Header */}
      <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
        <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>Skanic Library</h1>
      </div>

      {/* Dashboard Link */}
      <NavLink
        to="/dashboard-admin"
        className={`flex items-center gap-[15px] py-[20px] border-[#EDEDED]/[0.3] ${activeSidebar === 'dashboard' ? 'font-bold' : ''}`}
        activeClassName="selected"
        onClick={() => handleSidebarClick('dashboard')}
      >
        <FaTachometerAlt color='white' />
        <p className='text-[14px] leading-[20px] text-white'>Dashboard</p>
      </NavLink>

      {/* Buku Tamu */}
      <NavLink
        to="/dashboard-admin/buku-tamu"
        className={`flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] ${activeSidebar === 'buku-tamu' ? 'font-bold' : ''}`}
        onClick={() => handleSidebarClick('buku-tamu')}
      >
        <FaBookReader color='white' />
        <p className='text-[14px] leading-[20px] text-white'>Buku Tamu</p>
      </NavLink>

      {/* Data Master Section */}
      <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        {/* Section Header */}
        <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> DATA MASTER </p>

        {/* Anggota Link */}
        <NavLink
          to="/dashboard-admin/manajemen-user"
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar === 'user' ? 'font-bold' : ''}`}
          onClick={() => handleSidebarClick('user')}
        >
          <div className='flex items-center gap-[10px]'>
            <FaUser color='white' /> <p className='text-[14px] leading-[20px] text-white'>User</p>
          </div>
          <FaChevronRight color='white' />
        </NavLink>

        {/* Buku Link */}
        <NavLink
          to="/dashboard-admin/buku"
          className={`flex items-center justify-between gap-[10px] py-[15px] cursor-pointer ${activeSidebar === 'buku' ? 'font-bold' : ''}`}
          onClick={() => handleSidebarClick('buku')}
        >
          <div className='flex items-center gap-[10px]'>
            <FaBook color='white' /> <p className='text-[14px] leading-[20px] text-white'>Buku</p>
          </div>
          <FaChevronRight color='white' />
        </NavLink>
      </div>

      {/* Data Transaksi Section */}
      <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        {/* Section Header */}
        <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> DATA TRANSAKSI </p>

        {/* Peminjaman Buku Link */}
        <NavLink to="/dashboard-admin/peminjaman" className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
          <div className='flex items-center gap-[10px]'>
            <FaStickyNote color='white' /> <p className='text-[14px] leading-[20px] text-white'>Peminjaman</p>
          </div>
          <FaChevronRight color='white' />
        </NavLink>

        {/* Pengembalian Buku Link */}
        <NavLink to="/dashboard-admin/pengembalian" className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
          <div className='flex items-center gap-[10px]'>
            <FaRegChartBar color='white' /> <p className='text-[14px] leading-[20px] text-white'>Pengembalian</p>
          </div>
          <FaChevronRight color='white' />
        </NavLink>

        {/* Denda Link */}
        {/* <NavLink to="/dashboard-admin/denda" className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
          <div className='flex items-center gap-[10px]'>
            <FaRegCalendarAlt color='white' /> <p className='text-[14px] leading-[20px] text-white'>Denda</p>
          </div>
          <FaChevronRight color='white' />
        </NavLink> */}
      </div>

      {/* Sidebar Collapse Button */}
      <div className='pt-[15px]'>
        <div className='flex items-center justify-center'>
          <div className='h-[40px] w-[40px] bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer' onClick={toggleSidebar}>
            <FaChevronLeft color='white' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin;
