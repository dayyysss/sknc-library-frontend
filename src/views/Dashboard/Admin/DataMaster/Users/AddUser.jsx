import React from 'react'
import SidebarAdmin from '../../../../../components/Dashboard/Admin/SidebarAdmin'
import NavbarAdmin from '../../../../../components/Dashboard/Admin/DashboardNav'
import AnggotaAddCompo from '../../../../../components/Dashboard/Admin/DataMaster/ManajemenUser/AddUser'

const AddUser = () => {
  return (
    <div className="flex overflow-scroll ">
        <div className="basis-[12%] h-[100vh]">
          <SidebarAdmin />
        </div>

        <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <NavbarAdmin />
          <AnggotaAddCompo/>
          </div>
  </div>
  )
}

export default AddUser