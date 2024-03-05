import React from "react";
import { FaRegCalendarMinus, FaEllipsisV } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import PieComponent from "./PieComponent";
import { Progress } from "antd";
import error from "../../../../assets/images/error.png";

const datas = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Mei",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Agu",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Okt",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Des",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Main = () => {
  return (
    <div className="px-[25px] pt-[25px] bg-[#F8F9FC] pb-[40px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
          Dashboard Admin
        </h1>
        <button className="bg-[#2E59D9] h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px]">
          Generate Report
        </button>
      </div>
      <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
        {/* Gunakan Link untuk jumlah buku */}
        <Link
          to="/dashboard-admin/buku"
          className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out"
        >
          <div>
            <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
              JUMLAH BUKU
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              50
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color="" />
        </Link>
        {/* Elemen lainnya */}
        <Link
          to="/dashboard-admin/peminjaman"
          className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out"
        >
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              JUMLAH PEMINJAMAN
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              40
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </Link>
        {/* Elemen lainnya */}
        <Link
          to="/dashboard-admin/pengembalian"
          className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#c81c1c] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out"
        >
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              JUMLAH PENGEMBALIAN
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              20
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </Link>
        <Link
          to="/dashboard-admin/denda"
          className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#fcff5b] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out"
        >
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              LIHAT DENDA
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              20
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </Link>
        </div>
      <div className="flex mt-[22px] w-full gap-[15px]">
        <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[#4e73df] text-[16px] leading-[19px] font-bold">
              Grafik Peminjaman
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>

          <div className="w-full">
            {/* <canvas id="myAreaChart"></canvas> */}
            {/* <Line options={options} data={data} /> */}
            <LineChart
              width={1350}
              height={500}
              data={datas}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
