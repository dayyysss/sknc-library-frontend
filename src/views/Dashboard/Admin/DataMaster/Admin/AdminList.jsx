import React from 'react'
import SidebarAdmin from '../../../../../components/Dashboard/Admin/SidebarAdmin'
import NavbarAdmin from '../../../../../components/Dashboard/Admin/DashboardNav'
import AdminListCompo from '../../../../../components/Dashboard/Admin/DataMaster/Admin/AdminList'

const AdminList = () => {
  return (
    <div className="flex overflow-scroll ">
        <div className="basis-[12%] h-[100vh]">
          <SidebarAdmin />
        </div>

        <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <NavbarAdmin />
          <AdminListCompo/>
          </div>
  </div>
  )
}

export default AdminList