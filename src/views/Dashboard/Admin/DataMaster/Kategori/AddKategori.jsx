import React from 'react'
import SidebarAdmin from '../../../../../components/Dashboard/Admin/SidebarAdmin'
import NavbarAdmin from '../../../../../components/Dashboard/Admin/DashboardNav'
import KategoriAddCompo from '../../../../../components/Dashboard/Admin/DataMaster/Kategori/AddKategori'

const AddKategori = () => {
  return (
    <div className="flex overflow-scroll ">
        <div className="basis-[12%] h-[100vh]">
          <SidebarAdmin />
        </div>

        <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <NavbarAdmin />
          <KategoriAddCompo/>
          </div>
  </div>
  )
}

export default AddKategori