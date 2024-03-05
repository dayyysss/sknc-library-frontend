import React from "react";
import Sidebar from "../../../../components/Dashboard/Anggota/Sidebar";
import Header from "../../../../components/Dashboard/Anggota/Header";
import MainDaftarBuku from "../../../../components/Dashboard/Anggota/DaftarBuku/DaftarBukuA"

function DaftarBukuA() {
  return (
    <div className="flex h-screen w-full gap-1 bg-neutral-200">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <div className="custom-scrollbar flex-grow overflow-y-scroll bg-inherit  px-6 py-3">
          <MainDaftarBuku />
        </div>
      </div>
      {/* <div>footer</div> */}
    </div>
  );
}

export default DaftarBukuA
