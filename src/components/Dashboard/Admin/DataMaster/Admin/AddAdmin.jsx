import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddAdmin = () => {
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("M");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const data = {
    _id: ID,
    name,
    gender,
    address,
    email,
    phone,
  };

  const createMember = async (e) => {
    e.preventDefault();

    try {
      await addMemberFunc(data);
      navigate("/members");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        return;
      }
    }
  };

  return (
    <div className='px-[25px] pt-[25px] bg-[#F8F9FC]'>
    <div className='flex items-center justify-between'>
      <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer mb-6'>Tambah Data Admin</h1>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={createMember}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ID
            </label>
            <input
              type="text"
              pattern="\d*"
              maxLength="10"
              minLength="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={ID}
              onChange={(e) => setID(e.target.value)}
              placeholder="ID"
              required={true}
            />
          </div>
          <p className="text-red-500">{message}</p>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required={true}
                className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 20a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required={true}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required={true}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              pattern="\d*"
              maxLength="13"
              minLength="11"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="11-13 length"
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
              to={"dashboard-admin"}
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

export default AddAdmin;
