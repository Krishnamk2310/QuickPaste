import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import "../Redux/pasteSlice";
import { addToPastes, updateToPastes } from "../Redux/pasteSlice";
import Paste from './Paste';
const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state)=> state.paste.pastes);
  const paste = allPastes.filter((p)=>p._id === id)[0];

  return (
    <div>
    <div className="flex flex-row gap-7 place-content-between">
      <input
        type="text"
        className="p-2 rounded-2xl bg-black text-white mt-2 w-[100%] pl-4"
        placeholder="Enter title here"
        value={paste.title}
        onChange={(e) => setTitle(e.target.value)}
        disabled
      />
    </div>

    <div>
      <textarea
        value={paste.content}
        placeholder="Enter Content here"
        onChange={(e) => setValue(e.target.value)}
        rows={20}
        disabled
        className="rounded-2xl mt-4 min-w-[500px] p-4 bg-black text-white"
      />
    </div>
  </div>
  )
}

export default ViewPaste
