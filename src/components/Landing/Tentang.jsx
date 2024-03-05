import React from "react";
import img from "../../assets/about.svg";
import Button from "../../layouts/Landing/Button";
import Heading from "../../layouts/Landing/Heading";
import { Link } from "react-scroll";

const Tentang = () => {
  return (
    <div className=" md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>

      <div className="w-full md:w-2/4 text-center space-y-2">
        <Heading title1="Kami Adalah" title2="Skanic Library" />
        <p className=" text-lightText">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate
          molestiae consequuntur iste placeat recusandae qui nesciunt possimus.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate
          molestiae consequuntur iste placeat recusandae qui nesciunt possimus.
        </p>

        <Link to="contact" spy={true} smooth={true} duration={500}>
        </Link>
      </div>
    </div>
  );
};

export default Tentang;
