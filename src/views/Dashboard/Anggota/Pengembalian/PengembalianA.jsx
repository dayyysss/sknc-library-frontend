import React from "react";
import Sidebar from "../../../../components/Dashboard/Anggota/Sidebar";
import Header from "../../../../components/Dashboard/Anggota/Header";
import MainPengembalian from "../../../../components/Dashboard/Anggota/Pengembalian/PengembalianA"

function PengembalianA() {
  return (
    <div className="flex h-screen w-full gap-1 bg-neutral-200">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <div className="custom-scrollbar flex-grow overflow-y-scroll bg-inherit  px-6 py-3">
          <MainPengembalian />
        </div>
      </div>
      {/* <div>footer</div> */}
    </div>
  );
}

export default PengembalianA
