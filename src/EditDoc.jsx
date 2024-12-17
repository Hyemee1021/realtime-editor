import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiFileOn } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const EditDoc = ({ handleDelete, selectedDocId }) => {
  console.log(selectedDocId);
  const navigate = useNavigate();
  return (
    <div className="fixed button-0  right-20 md:right-32 border-2 w-[300px] h-[full] bg-slate-50 py-5 ">
      <ul className=" flex flex-col gap-2 px-3">
        <li
          className="hover:cursor-pointer hover:bg-slate-200 flex items-center gap-3 py-1 "
          onClick={() => navigate(`/doc/${selectedDocId}`)}
        >
          <CiFileOn />
          <span>Open</span>
        </li>
        <li className="hover:cursor-pointer hover:bg-slate-200 flex items-center gap-3 py-1 ">
          <MdEdit />
          <span>Edit</span>
        </li>
        <li className="hover:cursor-pointer hover:bg-slate-200 ">
          <button
            onClick={() => handleDelete(selectedDocId)}
            className=" flex items-center gap-2 py-1"
          >
            <MdDeleteOutline />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
