import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import MainAnggota from "../Dashboard/Dashboard"

function Layout() {
  return (
    <div className="flex h-screen w-full gap-1 bg-neutral-200">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <div className="custom-scrollbar flex-grow overflow-y-scroll bg-inherit  px-6 py-3">
          <MainAnggota />
        </div>
      </div>
      {/* <div>footer</div> */}
    </div>
  );
}

export default Layout;
