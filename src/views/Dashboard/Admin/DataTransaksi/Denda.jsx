import React from 'react'
import SidebarAdmin from '../../../../components/Dashboard/Admin/SidebarAdmin'
import NavbarAdmin from '../../../../components/Dashboard/Admin/DashboardNav'
import DendaCompo from '../../../../components/Dashboard/Admin/DataTransaksi/DendaCompo'

const Denda = () => {
  document.title = "Dashboard Admin - Denda";
  
  return (
    <div className="flex overflow-scroll ">
        <div className="basis-[12%] h-[100vh]">
          <SidebarAdmin />
        </div>

        <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <NavbarAdmin />
          <DendaCompo/>
          </div>
  </div>
  )
}

export default Denda