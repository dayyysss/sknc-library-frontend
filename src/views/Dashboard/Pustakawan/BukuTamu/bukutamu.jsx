import React from 'react';
import Navbar from '../../../../components/Dashboard/Pustakawan/Navbar/Navbar';
import Sidebar from '../../../../components/Dashboard/Pustakawan/Sidebar/Sidebar';
import BukuTamuP from '../../../../components/Dashboard/Pustakawan/BukuTamu/BukuTamu';
import './bukutamu.scss';

function BukuTamu({ type }) {
    return (
        <div className="list_page">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="list_page_main">
                <Navbar />

                {/* mui data table */}
                <div className="data_table">
                <BukuTamuP />
                 </div>
                </div>
            </div>
    );
}

export default BukuTamu;
