import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { layoutParam } from "store/interface/layout.interface";

const initialState: layoutParam = {
  isDetailOpen: false,
  detailData: undefined,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    updateDetailState: (state, { payload }) => {
      state.isDetailOpen = payload;
    },
    updateDetailData: (state, { payload }) => {
      state.detailData = payload;
    },
  },
});

export const layout = layoutSlice.name;
export const layoutReducer = layoutSlice.reducer;
export const layoutAction = layoutSlice.actions;
export default layoutReducer;
