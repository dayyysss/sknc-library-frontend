import React, { useState } from "react";
import Ilustration from "../../assets/ilus-logdaf.svg";
import { Link } from "react-router-dom";
import Api from "../../api/index.jsx";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const Login = () => {
  document.title = "Login - Skanic Library";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  
  //   try {
  //     const response = await Api.post("/api/login", {
  //       email,
  //       password,
  //     });
  
  //     if (response.data.success) {
  //       const { roles, permissions, token } = response.data;
  //       localStorage.setItem("token", token);
        
  //       let redirectPath = "";
  //       if (roles.includes("admin")) {
  //         redirectPath = "/dashboard-admin";
  //       } else if (roles.includes("pustakawan")) {
  //         redirectPath = "/dashboard-pustakawan";
  //       } else if (roles.includes("anggota")) {
  //         redirectPath = "/dashboard-anggota";
  //       } else {
  //         console.error("Invalid roles");
  //         return;
  //       }
        
  //       // Menampilkan toast untuk login berhasil
  //       toast.success("Login Berhasil!", {
  //         position: "top-center", // Menempatkan toast di tengah atas layar
  //       });
        
  //       // Menunda pengalihan halaman ke dashboard dengan delay 2 detik
  //       setTimeout(() => {
  //         // Cek izin pengguna
  //         if (permissions && permissions.includes("view_dashboard")) {
  //           window.location.href = redirectPath;
  //         } else {
  //           console.error("Insufficient permissions");
  //           // Menampilkan toast untuk izin tidak mencukupi
  //           toast.error("Anda tidak memiliki izin untuk mengakses halaman ini", {
  //             position: "top-center",
  //           });
  //         }
  //       }, 2000);
        
  //       if (rememberMe) {
  //         Cookies.set("rememberedEmail", email);
  //       } else {
  //         Cookies.remove("rememberedEmail");
  //       }
  //     } else {
  //       // Menampilkan toast untuk login gagal
  //       toast.error("Gagal masuk, email atau kata sandi salah", {
  //         position: "top-center",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Terjadi kesalahan saat masuk", {
  //       position: "top-center",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await Api.post("/api/login", {
        email,
        password,
      });
  
      if (response.data.success) {
        const { roles, token } = response.data;
        localStorage.setItem("token", token);
        
        let redirectPath = "";
        if (roles.includes("admin")) {
          redirectPath = "/dashboard-admin";
        } else if (roles.includes("pustakawan")) {
          redirectPath = "/dashboard-pustakawan";
        } else if (roles.includes("anggota")) {
          redirectPath = "/dashboard-anggota";
        } else {
          console.error("Invalid roles");
          return;
        }
        
        // Menampilkan toast untuk login berhasil
        toast.success("Login Berhasil!", {
          position: "top-center", // Menempatkan toast di tengah atas layar
        });
        
        // Menunda pengalihan halaman ke dashboard dengan delay 2 detik
        setTimeout(() => {
          window.location.href = redirectPath;
        }, 2000);
        
        if (rememberMe) {
          Cookies.set("rememberedEmail", email);
        } else {
          Cookies.remove("rememberedEmail");
        }
      } else {
        // Menampilkan toast untuk login gagal
        toast.error("Gagal masuk, email atau kata sandi salah", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat masuk", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="grid md:grid-cols-2 md:gap- place-items-center w-full min-h-screen">
      <div className="hidden md:block md:w-full">
        <img src={Ilustration} alt="Ilustration" />
      </div>
      <div className="flex flex-col justify-center items-center w-4/5">
        <h3 className="mb-4 text-2xl font-bold text-green-600 uppercase">
          Masuk Skanic Library
        </h3>
        <div className="w-full">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="email"
                className="mb-1 text-sm text-green-400 font-semibold uppercase"
                style={{ alignSelf: "flex-start", marginLeft: "2px" }}
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                placeholder="Masukkan email anda"
                className="w-full border-2 border-green-500 rounded-lg p-2 placeholder:text-sm focus-visible:outline-none focus:border-green-400"
                required
              />
            </div>

            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="password"
                className="mb-1 text-sm text-green-400 font-semibold uppercase"
                style={{ alignSelf: "flex-start", marginLeft: "2px" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                placeholder="Masukkan password anda"
                className="w-full border-2 border-green-500 rounded-lg p-2 placeholder:text-sm focus-visible:outline-none focus:border-green-400"
                required
              />
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember Me
              </label>
            </div>

            <div className="w-full">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-500 px-2 py-3 mt-4 text-white font-semibold tracking-widest uppercase rounded-lg hover:bg-green-300 cursor-pointer ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-500 mt-4">
            Tidak punya akun?{" "}
            <Link
              to="/register"
              className="text-green-500 hover:text-green-700"
            >
              daftar disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;