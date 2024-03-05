import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddPustakawan = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nip, setNip] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const createPustakawan = async (e) => {
    e.preventDefault();

    try {
      // Lakukan operasi untuk menambahkan pustakawan
      navigate("/dashboard-admin/pustakawan");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        return;
      }
    }
  };

  return (
    <div className="px-[25px] pt-[25px] bg-[#F8F9FC]">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer mb-6">
          Tambah Data Pustakawan
        </h1>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={createPustakawan}>
          <p className="text-red-500">{message}</p>
          <div className="flex flex-wrap">
            <div className="mb-4 w-full lg:w-1/2 pr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required={true}
              />
            </div>
            <div className="mb-4 w-full lg:w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required={true}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="mb-4 w-full lg:w-1/2 pr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required={true}
              />
            </div>
            <div className="mb-4 w-full lg:w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                NIP
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="NIP"
                required={true}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              No Telp
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="No Telp"
              required={true}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Tambah
            </button>
            <Link
              to={"/dashboard-admin"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPustakawan;
