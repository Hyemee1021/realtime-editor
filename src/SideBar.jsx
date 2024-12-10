import React from "react";
import { PlusSign } from "./PlusSign";
import { MdHome } from "react-icons/md";
import { BsClipboard2DataFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
export const SideBar = () => {
  const location = useLocation();
  const urlPath = location.pathname;
  console.log("sidebar", urlPath);
  return (
    <div className=" h-screen w-full bg-slate-50 pt-5 ">
      <PlusSign />
      <ul className="mx-4 mt-3 flex flex-col gap-3 ">
        {urlPath === "/doc" ? (
          <li className="flex items-center gap-2 p-2 bg-blue-200 cursor-pointer rounded-full ">
            <MdHome />
            <span>Home</span>
          </li>
        ) : (
          <li className="flex items-center gap-2 p-2 hover:bg-slate-200 cursor-pointer rounded-full ">
            <MdHome />
            <span>Home</span>
          </li>
        )}
        <li className="flex items-center gap-2 p-2 hover:bg-slate-200 cursor-pointer rounded-full ">
          <BsClipboard2DataFill />
          <span>My Drive</span>
        </li>
      </ul>
    </div>
  );
};
