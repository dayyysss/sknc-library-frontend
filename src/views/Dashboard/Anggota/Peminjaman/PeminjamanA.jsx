import React from "react";
import Sidebar from "../../../../components/Dashboard/Anggota/Sidebar";
import Header from "../../../../components/Dashboard/Anggota/Header";
import MainPeminjaman from "../../../../components/Dashboard/Anggota/Peminjaman/PeminjamanA"

function PeminjamanA() {
  return (
    <div className="flex h-screen w-full gap-1 bg-neutral-200">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <div className="custom-scrollbar flex-grow overflow-y-scroll bg-inherit  px-6 py-3">
          <MainPeminjaman />
        </div>
      </div>
      {/* <div>footer</div> */}
    </div>
  );
}

export default PeminjamanA
