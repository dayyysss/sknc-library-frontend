import React from "react";
import img from "../../assets/hero.svg";
import Button from "../../layouts/Landing/Button";
import { useNavigate } from "react-router-dom";

const Beranda = () => {
  const navigate = useNavigate();

  const handleCariBukuClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-[80vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
      <div className="md:w-2/4 text-center">
        <h2 className="text-5xl font-semibold leading-tight">
          Selamat Datang Di
          <span className="text-brightGreen"> Skanic Library</span>
        </h2>
        <p className="text-lightText mt-5 text-start m-6">
          Skanic Library is your gateway to a world of limitless learning possibilities.
          With our cutting-edge eLearning platform, you can explore a vast
          library of courses, from academic subjects to practical skills, all
          designed to help you achieve your goals.
        </p>

        <Button title="Cari Buku" onClick={handleCariBukuClick} />
      </div>

      <div className="w-full md:w-2/4">
        <img src={img} alt="img" className="mt-10" />
      </div>
    </div>
  );
};

export default Beranda;
