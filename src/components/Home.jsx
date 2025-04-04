import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "../Redux/pasteSlice";
import { addToPastes, updateToPastes } from "../Redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=>state.paste.pastes);

  useEffect(()=>{
    if(pasteId){
      const paste = allPastes.find((p)=>p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  },[pasteId])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(12),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          type="text"
          className="p-2 rounded-2xl bg-black text-white mt-2 w-[66%] pl-4"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="p-2 rounded-2xl bg-black text-white mt-2"
        >
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>

      <div>
        <textarea
          value={value}
          placeholder="Enter Content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          className="rounded-2xl mt-4 min-w-[500px] p-4 bg-black text-white"
        />
      </div>
    </div>
  );
};

export default Home;
