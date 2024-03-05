import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const ListUser = () => {
  document.title = "Dashboard Admin - Manajemen User";

  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;

  const [searchTerm, setSearchTerm] = useState("");
  const [roleCategory, setRoleCategory] = useState("");

  const fetchUsers = async () => {
    try {
      const access_token = localStorage.getItem("token");
      if (!access_token) {
        console.error("Token not available. Please log in.");
        return;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            searchTerm: searchTerm,
            roleCategory: roleCategory,
          },
        }
      );

      setUser(response.data.users);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      setUser([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, roleCategory]);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const access_token = localStorage.getItem("token");
      if (!access_token) {
        console.error("Token not available. Please log in.");
        return;
      }

      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      fetchUsers();
      Swal.fire("Success", "User deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting user:", error.message);
      Swal.fire("Error", "Failed to delete user", "error");
    }
  };

  const handleEdit = async (userId) => {
    try {
      const selectedUser = user.find((user) => user.id === userId);

      if (selectedUser) {
        const { name, email, role } = selectedUser;

        if (role && role.name) {
          setFormData({
            id: userId,
            name: name || "",
            email: email || "",
            password: "",
            role: role.name || "",
          });
          setSelectedUserId(userId);
          setShowEditForm(true);
        } else {
          console.error("Error: Peran pengguna tidak didefinisikan.");
          // Handle error properly, e.g., display a message to the user
        }
      } else {
        console.error("Error: Pengguna terpilih tidak ditemukan.");
        // Handle error properly, e.g., display a message to the user
      }
    } catch (error) {
      console.error("Error fetching user data for edit:", error);
      // Handle error properly, e.g., display a message to the user
    }
  };

  const getRoleIdFromApi = (roleName) => {
    // Logika untuk mendapatkan role_id dari API
    // ...

    // Contoh implementasi sederhana, pastikan sesuai dengan API Anda
    const roleMappings = {
      admin: 1,
      pustakawan: 2,
      anggota: 3,
      // tambahkan mapping lain sesuai kebutuhan
    };

    return roleMappings[roleName.toLowerCase()] || null;
  };

  const handleSubmit = async () => {
    try {
      const access_token = localStorage.getItem("token");
      if (!access_token) {
        console.error("Token not available. Please log in.");
        return;
      }

      if (formData.id) {
        await axios.put(
          `http://127.0.0.1:8000/api/user/${formData.id}`,
          { ...formData, role_id: getRoleIdFromApi(formData.role) },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
      } else {
        // Dapatkan role_id dari fungsi getRoleIdFromApi(formData.role)
        const roleId = getRoleIdFromApi(formData.role);

        await axios.post(
          "http://127.0.0.1:8000/api/user",
          { ...formData, role_id: roleId },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
      }

      fetchUsers();
      setShowAddForm(false);
      setShowEditForm(false);
      setFormData({ id: null, name: "", email: "", password: "", role: "" });
    } catch (error) {
      console.error("Error creating/updating user:", error);
      // Handle errors appropriately
    }
  };

  const renderTable = () => {
    switch (roleCategory) {
      case "admin":
        return (
          <div className="overflow-x-auto">
            <table className="bg-white table-auto w-full shadow-md rounded-md overflow-hidden border border-gray-300">
              <thead className="bg-gray-200">
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Password</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.password}</td>
                      <td className="px-4 py-2">
                        <FaUserEdit
                          onClick={() => handleEdit(user.id)}
                          className="cursor-pointer text-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <MdOutlineDeleteForever
                          onClick={() => handleDelete(user.id)}
                          className="cursor-pointer text-red-500"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"Sebelumnya"}
              nextLabel={"Berikutnya"}
              pageCount={Math.ceil(users.length / usersPerPage)}
              onPageChange={({ selected }) => setPageNumber(selected)}
              containerClassName={"pagination flex gap-2 mt-4 justify-center"}
              previousLinkClassName={
                "pagination__link px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400 bg-gray-100"
              }
              nextLinkClassName={
                "pagination__link px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400 bg-gray-100"
              }
              disabledClassName={"pagination__link--disabled"}
              activeClassName={
                "pagination__link--active bg-gray-500 text-white border-blue-500"
              }
            />
          </div>
        );
      case "pustakawan":
        return (
          <div className="overflow-x-auto">
            <table className="bg-white table-auto w-full shadow-md rounded-md overflow-hidden border-r border-gray-300">
              <thead className="bg-gray-200">
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border-r">No</th>
                  <th className="px-4 py-2 border-r">Nama</th>
                  <th className="px-4 py-2 border-r">Nisn</th>
                  <th className="px-4 py-2 border-r">Kelas</th>
                  <th className="px-4 py-2 border-r">Email</th>
                  <th className="px-4 py-2 border-r">Password</th>
                  <th className="px-4 py-2 border-r">Edit</th>
                  <th className="px-4 py-2 border-r">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.nisn}</td>
                      <td className="px-4 py-2">{user.kelas}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.password}</td>
                      <td className="px-4 py-2">
                        <FaUserEdit
                          onClick={() => handleEdit(user.id)}
                          className="cursor-pointer text-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <MdOutlineDeleteForever
                          onClick={() => handleDelete(user.id)}
                          className="cursor-pointer text-red-500"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"Sebelumnya"}
              nextLabel={"Berikutnya"}
              pageCount={Math.ceil(users.length / usersPerPage)}
              onPageChange={({ selected }) => setPageNumber(selected)}
              containerClassName={"pagination flex gap-2 mt-4 justify-center"}
              previousLinkClassName={
                "pagination__link px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400 bg-gray-100"
              }
              nextLinkClassName={
                "pagination__link px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400 bg-gray-100"
              }
              disabledClassName={"pagination__link--disabled"}
              activeClassName={
                "pagination__link--active bg-gray-500 text-white border-blue-500"
              }
            />
          </div>
        );
      case "anggota":
        return (
          <div className="overflow-x-auto">
            <table className="bg-white table-auto w-full shadow-md rounded-md overflow-hidden border-r border-gray-300">
              <thead className="bg-gray-200">
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border-r">No</th>
                  <th className="px-4 py-2 border-r">Nama</th>
                  <th className="px-4 py-2 border-r">Nip</th>
                  <th className="px-4 py-2 border-r">Jabatan</th>
                  <th className="px-4 py-2 border-r">Pangkat</th>
                  <th className="px-4 py-2 border-r">Nomor Telepon</th>
                  <th className="px-4 py-2 border-r">Email</th>
                  <th className="px-4 py-2 border-r">Password</th>
                  <th className="px-4 py-2 border-r">Edit</th>
                  <th className="px-4 py-2 border-r">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.nip}</td>
                      <td className="px-4 py-2">{user.jabatan}</td>
                      <td className="px-4 py-2">{user.pangkat}</td>
                      <td className="px-4 py-2">{user.nomer_telpon}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.password}</td>
                      <td className="px-4 py-2">
                        <FaUserEdit
                          onClick={() => handleEdit(user.id)}
                          className="cursor-pointer text-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <MdOutlineDeleteForever
                          onClick={() => handleDelete(user.id)}
                          className="cursor-pointer text-red-500"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"Sebelumnya"}
              nextLabel={"Berikutnya"}
              pageCount={Math.ceil(users.length / usersPerPage)}
              onPageChange={({ selected }) => setPageNumber(selected)}
              containerClassName={"pagination flex gap-2 mt-4 justify-center"}
              previousLinkClassName={
                "pagination__link px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400 bg-gray-100"
              }
              nextLinkClassName={
                "pagination__link px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400 bg-gray-100"
              }
              disabledClassName={"pagination__link--disabled"}
              activeClassName={
                "pagination__link--active bg-gray-500 text-white border-blue-500"
              }
            />
          </div>
        );
    }
  };

  return (
    <div className="px-[25px] pt-[25px] pb-[auto] bg-[#F8F9FC]">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
          Data User
        </h1>
        </div>

        <div className="flex-1 h-screen p-8">
          <div className="p-4">
          <h1 className="text-center font-semibold mb-4">
            Silakan pilih role untuk melihat data
          </h1>
            <button
              className="text-sm font-bold text-white bg-blue-500 py-3 px-4 rounded-md mb-9"
              onClick={() => setShowAddForm(true)}
            >
              Tambah User
            </button>
            <div className="text-center mx-auto">
              <div className="flex justify-between mb-4">
                <div className="w-1/2 mr-2">
                  <input
                    type="text"
                    placeholder="Cari Akun Pengguna"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={roleCategory}
                    onChange={(e) => setRoleCategory(e.target.value)}
                  >
                    <option value="">Pilih Role</option>
                    <option value="admin">Admin</option>
                    <option value="siswa">Pustakawan</option>
                    <option value="pembimbing">Anggota</option>
                  </select>
                </div>
                
              </div>
              {renderTable()}
            </div>
          </div>
        </div>

      {/* Form tambah user */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
          <div className="bg-white p-8 min-w-80 mx-auto rounded-md">
            <UserForm
              onClose={() => {
                setShowAddForm(false);
                setFormData({
                  id: null,
                  name: "",
                  email: "",
                  password: "",
                  role: "",
                });
              }}
              onSubmit={handleSubmit}
              formData={formData}
              onInputChange={handleInputChange}
              roleCategory={roleCategory}
              setFormData={setFormData} // Tambahkan properti setFormData di sini
            />
          </div>
        </div>
      )}

      {/* Form edit user */}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 min-w-80 mx-auto rounded-md">
            <Edit
              onClose={() => {
                setShowEditForm(false);
                setFormData({
                  id: null,
                  name: "",
                  email: "",
                  password: "",
                  role: "",
                  role_id: "", // Set role_id menjadi kosong saat menutup form
                });
              }}
              onSubmit={handleSubmit}
              formData={formData}
              onInputChange={handleInputChange}
              roleCategory={roleCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUser;