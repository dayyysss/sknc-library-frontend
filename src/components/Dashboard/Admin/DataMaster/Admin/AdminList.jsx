import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteModal from "../../DeleteModal/DeleteModal";

const AdminList = () => {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMembers();
  }, [page, keyword]);

  const getMembers = async () => {
    try {
      const response = await getPaginatedMembersFunc(page, keyword);
      setMembers(response.data.members);
      setPage(response.data.page);
      setRows(response.data.totalRows);
      setPages(response.data.totalPages);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteMember = async (id) => {
    try {
      await deleteMemberFunc(id);
      setShowDelete(false);
      getMembers();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 10) {
      setMessage("If not found, please use search by keyword");
    } else {
      setMessage("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMessage("");
    setKeyword(query);
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDeleteMember = async (id) => {
    await deleteMember(id);
    setShowDelete(false);
  };

  return (
    <>
      {showDelete && (
        <DeleteModal
          show={setShowDelete}
          onDelete={() => handleDeleteMember(deleteId)}
        />
      )}
      <div className='px-[25px] pt-[25px] pb-[370px] bg-[#F8F9FC]'>
        <div className='flex items-center justify-between'>
          <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer'>Data Admin</h1>

          <Link to="/dashboard-admin/admin/add-admin/*" className="bg-blue-500 h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px]">
            Tambah Admin
          </Link>

        </div>

        <div className="mt-4">
          <form onSubmit={searchData} className="w-full max-w-md mx-auto ">
            <div className="flex items-center border border-slate-500 rounded">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari sesuatu di sini..."
              />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Cari
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-left">Total : {rows}</p>
        <table className="w-full table-auto mt-4 border border-slate-500 border-collapse bg-white shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Jenis Kelamin</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Telepon</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{member._id}</td>
                <td className="border px-4 py-2">{member.name}</td>
                <td className="border px-4 py-2">{member.gender}</td>
                <td className="border px-4 py-2">{member.address}</td>
                <td className="border px-4 py-2">{member.email}</td>
                <td className="border px-4 py-2">{member.phone}</td>
                <td className="border px-4 py-2">
                  <Link
                    to={`/member/${member._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleClickDelete(member._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-left mt-8">
          Page: {rows ? page + 1 : page} of {pages}
        </p>
        <p className="mt-4 text-center text-red-500">{message}</p>

        <div className="flex justify-center items-center mt-4" aria-label="pagination">
          <Stack spacing={2}>
            <Pagination count={10} color="primary" />
          </Stack>
        </div>



      </div>
    </>
  );
};

export default AdminList;
