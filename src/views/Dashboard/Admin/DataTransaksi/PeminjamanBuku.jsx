import React from 'react'
import SidebarAdmin from '../../../../components/Dashboard/Admin/SidebarAdmin'
import NavbarAdmin from '../../../../components/Dashboard/Admin/DashboardNav'
import PeminjamanCompo from '../../../../components/Dashboard/Admin/DataTransaksi/PeminjamanCompo'

const PeminjamanBuku = () => {
  document.title = "Dashboard Admin - Peminjaman";
  return (
    <div className="flex overflow-scroll ">
        <div className="basis-[12%] h-[100vh]">
          <SidebarAdmin />
        </div>

        <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <NavbarAdmin />
          <PeminjamanCompo/>
          </div>
  </div>
  )
}

export default PeminjamanBuku