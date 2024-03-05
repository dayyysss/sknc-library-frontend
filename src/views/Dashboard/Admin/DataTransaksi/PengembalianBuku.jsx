import React from 'react'
import SidebarAdmin from '../../../../components/Dashboard/Admin/SidebarAdmin'
import NavbarAdmin from '../../../../components/Dashboard/Admin/DashboardNav'
import PengembalianCompo from '../../../../components/Dashboard/Admin/DataTransaksi/PengembalianCompo'

const PengembalianBuku = () => {
  document.title = "Dashboard Admin - Pengembalian";
  return (
    <div className="flex overflow-scroll ">
        <div className="basis-[12%] h-[100vh]">
          <SidebarAdmin />
        </div>

        <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <NavbarAdmin />
          <PengembalianCompo/>
          </div>
  </div>
  )
}

export default PengembalianBuku