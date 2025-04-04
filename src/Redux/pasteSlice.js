import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const getInitialPastes = () => {
  try {
    const stored = localStorage.getItem("pastes");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Invalid JSON in localStorage:", error);
    localStorage.removeItem("pastes");
    return [];
  }
};

const initialState = {
  pastes: getInitialPastes(),
};

export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated");
      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast("All Pastes Cleared");
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  removeFromPastes,
  resetAllPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
