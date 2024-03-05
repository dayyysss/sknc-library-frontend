/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../../../components/Dashboard/Pustakawan/DataTable/DataTable";
import Navbar from "../../../../components/Dashboard/Pustakawan/Navbar/Navbar";
import Sidebar from "../../../../components/Dashboard/Pustakawan/Sidebar/Sidebar";
import TableList from "../../../../components/Dashboard/Pustakawan/DataBuku/DataBuku";
import "./BooksList.scss";

function BooksList({ type }) {
  //
  return (
    <div className="list_page">
      <div className="home_sidebar">
        <Sidebar />
      </div>

      <div className="list_page_main">
        <Navbar />

        {/* mui data table */}
        <div className="data_table">
          <div className="btnn">
            <Link
              to="/dashboard-pustakawan/data-buku/tambah-buku/"
              style={{ textDecoration: "none" }}
            >
              <button type="button">Tambah {type}</button>
            </Link>
          </div>

          {type === "book" ? <DataTable /> : <TableList />}
        </div>
      </div>
    </div>
  );
}

export default BooksList;