import React from "react";
import Heading from "../../layouts/Landing/Heading";
import CoursesCard from "../../layouts/Landing/LayananCard";
import webImg from "../../assets/web-dev.svg";
import appImg from "../../assets/App-dev.svg";
import graphicImg from "../../assets/graphic.svg";
import digitalImg from "../../assets/digital.svg";

const Layanan = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center md:px-32 px-5 my-10">
      <Heading title1="Nikmati Layanan" title2="Skanic Library" />

      <div className=" flex flex-wrap justify-center gap-6 mt-6">
        <CoursesCard img={webImg} title="Sirkulasi" />
        <CoursesCard img={appImg} title="Referensi" />
        <CoursesCard img={graphicImg} title="Layanan terbitan berkala" />
        <CoursesCard img={digitalImg} title="Kotak Saran" />
      </div>
    </div>
  );
};

export default Layanan;
