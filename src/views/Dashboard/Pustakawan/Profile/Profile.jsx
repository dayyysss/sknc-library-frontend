/* eslint-disable no-constant-condition */
/* eslint-disable no-nested-ternary */
import { Link } from "react-router-dom";
import Navbar from "../../../../components/Dashboard/Pustakawan/Navbar/Navbar";
import Sidebar from "../../../../components/Dashboard/Pustakawan/Sidebar/Sidebar";
import profil from "../../../../assets/ImagesNew/admin_pic.jpg";
import React, { useState } from "react";

function PeminjamanBuku({ type }) {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="list_page">
      <div className="home_sidebar">
        <Sidebar />
      </div>

      <div className="list_page_main">
        <Navbar />

        {/* mui data table */}
        <main className="profile-page">
          <section className="relative block" style={{ height: "500px" }}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={profil}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                          style={{ maxWidth: "150px" }}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={handleToggleModal}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            12
                          </span>
                          <span className="text-sm text-gray-500">
                            Companies
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            32
                          </span>
                          <span className="text-sm text-gray-500">
                            Projects
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            3
                          </span>
                          <span className="text-sm text-gray-500">
                            Collaborations
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                      Pankaj Patidar
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                      New Delhi, India
                    </div>
                    <div className="mb-2 text-gray-700 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                      Full Stack Developer
                    </div>
                    <div className="mb-2 text-gray-700">
                      <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                      B.Tech (CSE)
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          A developer with expertise in multiple stacks with use
                          of latest technologies. Worked with multiple clients
                          on different ideas to implement and create successful
                          products for real world problems and to simplify them.
                        </p>
                        <a
                          href="#pablo"
                          className="font-normal text-pink-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black opacity-50 absolute inset-0" onClick={handleToggleModal}></div>
            <div className="bg-white p-8 rounded-lg shadow-xl z-50 w-1/4"> {/* Memperbesar modal dengan menyesuaikan ukuran lebar */}
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <div className="flex justify-center items-center mb-4">
                <div className="relative w-24 h-24">
                  <img
                    src={profil}
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover"
                  />
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer"
                  >
                    <input
                      type="file"
                      id="profileImage"
                      className="hidden"
                      onChange={(e) => {
                        // handle file upload logic here
                      }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <form className="space-y-4 w-full">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input type="text" id="username" name="username" className="mt-1 block w-full py-2 px-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> {/* Menambahkan py-2 dan px-3 untuk membuat input lebih besar */}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full py-2 px-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> {/* Menambahkan py-2 dan px-3 untuk membuat input lebih besar */}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" id="password" name="password" className="mt-1 block w-full py-2 px-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" /> {/* Menambahkan py-2 dan px-3 untuk membuat input lebih besar */}
                </div>
              </form>


              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-9" onClick={handleToggleModal}>Edit</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={handleToggleModal}>Close</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default PeminjamanBuku;
