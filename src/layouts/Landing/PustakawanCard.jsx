import React from "react";

const PustakawanCard = (props) => {
  return (
    <div className="w-full md:w-1/3 bg-[#F5F7F8] border-2 border-lightText md:border-none p-5 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all">
      <div>
        <p className="text-lightText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In
          consectetur error, dolores quae ipsa quos enim corporis magni
          obcaecati tempore natus eos, libero ducimus nulla neque eaque maxime
          nam molestias?
        </p>
      </div>

      <div className="flex flex-row justify-center">
        <img className="rounded-full w-1/4 mt-6" src={props.img} alt="img" />
      </div>

      <p className="text-center mt-5">Mr. Kevin Reinanda</p> {/* Tambahkan baris ini */}
    </div>
  );
};

export default PustakawanCard;
