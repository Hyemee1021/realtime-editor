import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
export const PlusSign = () => {
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate("/addDoc");
  };
  return (
    <div className=" h-screen w-1/5 bg-slate-50 pt-5 ">
      <button
        className=" ml-3 rounded-md shadow-md bg-white px-2 w-[30%] h-10 flex items-center justify-center gap-3    cursor-pointer"
        onClick={handleOpen}
      >
        <FaPlus />
        <p>New</p>
      </button>
      <ul className="mx-4 mt-3 ">
        <li className="flex items-center gap-2 p-2 hover:bg-slate-200 cursor-pointer rounded-full ">
          <MdHome />
          <span>Home</span>
        </li>
      </ul>
    </div>
  );
};
