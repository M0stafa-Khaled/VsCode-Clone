import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IFile } from "../../interfaces";

interface IClickedFile {
  activeTabID: string | null;
  fileName: string;
  fileContent: string | undefined;
}

interface IInitialState {
  openedFiles: IFile[];
  clickedFile: IClickedFile;
  tabIdToRemove: string | null;
}

const initialState: IInitialState = {
  openedFiles: [],
  clickedFile: {
    activeTabID: null,
    fileName: "",
    fileContent: "",
  },
  tabIdToRemove: null,
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setClickedFile: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
    setTabIdToRemove: (state, action: PayloadAction<string | null>) => {
      state.tabIdToRemove = action.payload;
    },
  },
});

export default fileTreeSlice.reducer;

export const { setOpenedFiles, setClickedFile, setTabIdToRemove } =
  fileTreeSlice.actions;
export const fileTreeSelector = ({ fileTree }: RootState) => fileTree;
