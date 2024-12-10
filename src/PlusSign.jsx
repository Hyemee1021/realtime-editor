import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const PlusSign = () => {
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate("/addDoc");
  };
  return (
    <button
      className=" ml-3 rounded-md shadow-md bg-white px-2 w-[60%] h-10 flex items-center justify-center gap-3    cursor-pointer"
      onClick={handleOpen}
    >
      <FaPlus />
      <p>New</p>
    </button>
  );
};
