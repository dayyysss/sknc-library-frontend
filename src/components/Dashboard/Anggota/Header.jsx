import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import UserImg from "./../../../assets/avatar.svg";
import { Popover, Transition, Menu } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// Import axios untuk request HTTP
import axios from "axios";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Lakukan request untuk logout ke server
      await axios.post("http://localhost:8000/api/logout", {
        // Tambahkan body request jika diperlukan
      });
      // Hapus token dari local storage
      localStorage.removeItem("token");
      // Tampilkan pemberitahuan logout berhasil di tengah layar
      toast.success("Logout berhasil!", {
        position: "top-center",
      });
      // Tunda pengalihan ke halaman login setelah 2 detik
      setTimeout(() => {
        navigate("/");
      }, 2000); // Ubah angka 2000 menjadi jumlah milidetik yang Anda inginkan
    } catch (error) {
      console.error("Error logging out:", error);
      // Tampilkan pemberitahuan gagal logout jika terjadi kesalahan
      toast.error("Gagal melakukan logout. Silakan coba lagi.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="block md:flex items-center justify-between px-8 py-3 bg-neutral-50 mb-2">
      <div className="serachbar border border-slate-200 p-1 rounded w-full md:w-1/3 flex items-center gap-2 mb-2 md:mb-0">
        <span className="text-slate-400">
          <IoIosSearch fontSize={26} />
        </span>
        <input
          type="text"
          placeholder="Cari buku dan kategori"
          className="bg-inherit w-full border-none focus:outline-none focus:border-none text-neutral-400 text-sm focus:text-slate-700"
        />
      </div>
      <div className="icons flex items-center gap-3">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={
                  open
                    ? `bg-gray-200 text-slate-400 cursor-pointer hover:text-slate-700 flex items-center border-none focus:outline-none focus:border-none p-1 rounded`
                    : `text-slate-400 cursor-pointer hover:text-slate-700 flex items-center border-none focus:outline-none focus:border-none p-1`
                }
              >
                <IoIosNotificationsOutline fontSize={26} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 w-60">
                  <div className="bg-white rounded p-2 shadow-lg mt-1">
                    <p className="text-sm font-semibold text-slate-700 mb-2">
                      Notifications
                    </p>
                    <p className="text-xs text-slate-700 cursor-pointer hover:text-slate-400">
                      This is Notifications Panel
                    </p>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <div className="w-10 h-10">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="">
                <img
                  src={UserImg}
                  alt="User"
                  className="object-cover rounded-full cursor-pointer w-full"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-40 bg-white shadow-lg rounded-sm">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          navigate("/dashboard-anggota/profile")
                        }
                        className="block mb-1 text-sm hover:bg-slate-100 w-full text-start px-2 py-1"
                      >
                        Your Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/settings")}
                        className="block mb-1 text-sm hover:bg-slate-100 w-full text-start px-2 py-1"
                      >
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className="block text-sm hover:bg-slate-100 w-full text-start px-2 py-1"
                      >
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
