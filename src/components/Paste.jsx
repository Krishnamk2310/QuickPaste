import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../Redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="p-4">
      <input
        type="search"
        className="p-2 rounded-2xl min-w-[500px] bg-black text-white pl-5 mt-3"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filterData.length > 0 &&
          filterData.map((paste, index) => {
            return (
              <div key={index}>
                <div className="p-3 bg-gradient-to-r from-gray-800 via-indigo-800 to-purple-800 text-white rounded-xl border border-indigo-500">
                  {paste.title}
                </div>
                <div className="p-3 bg-gradient-to-br from-gray-800 via-teal-700 to-emerald-600 text-white rounded-xl border border-teal-500">
                  {paste.content}
                </div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <a
                    href={`/?pasteId=${paste?._id}`}
                    style={{ color: "white", textDecoration: "none" }}
                    className="inline-block px-6 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%] animate-gradientMove"
                  >
                    Edit
                  </a>

                  <a
                    href={`/pastes/${paste?._id}`}
                    style={{ color: "white", textDecoration: "none" }}
                    className="inline-block px-6 py-2 rounded-md font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%] animate-gradientMove"
                  >
                    View
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="px-6 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%] animate-gradientMove"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="px-6 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%] animate-gradientMove"
                  >
                    Delete
                  </button>
                  <button className="px-6 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%] animate-gradientMove">
                    Share
                  </button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
