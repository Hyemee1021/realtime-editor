import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ user, docArr }) => {
  const userId = user.uid;
  const [searchStr, setSearchStr] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchStr);
  console.log("docArr from searchbar", docArr);
  console.log("searchResult" + searchResult);
  const [errorMessage, setErrorMessage] = useState("");

  // find documents that includes a string from input
  const handleSearch = () => {
    const result = docArr.filter((doc) =>
      doc.title.toLowerCase().includes(searchStr.toLowerCase())
    );

    setSearchResult(result);
    setSearchStr("");
  };

  return (
    <div className="w-[40%]">
      <div className="w-full flex justify-between items-center mx-auto flex-row px-5 py-1 rounded-full bg-slate-200 ">
        <input
          className="bg-slate-200 px-2"
          value={searchStr}
          placeholder="Search..."
          onChange={(e) => setSearchStr(e.target.value)}
        />
        <IoIosSearch className="hover:cursor-pointer " onClick={handleSearch} />
      </div>
      {searchResult.length > 0 && (
        <div className="absolute top-16 w-full left-0 bg-gray-50 shadow-md py-2">
          {searchResult.map((doc) => (
            <div key={doc.id} className="p-2 text-red-400">
              {doc.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
