import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { layoutParam, ShopType } from "store/interface/layout.interface";
import { Member } from "store/interface/member";

const initialState: any | layoutParam = {
  isDetailOpen: false,
  detailData: new ShopType({}),
  cartData: new ShopType({}),
  giveUser: { friendId: 0, nickname: "", imageString: "" },
  newUser: {},
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
    updateCartData: (state, { payload }) => {
      state.cartData = payload;
    },
    updataGiveUser: (state, { payload }) => {
      state.giveUser = payload;
    },
    reset: (state) => {
      state.giveUser = initialState.giveUser;
    },
  },
});

export const layout = layoutSlice.name;
export const layoutReducer = layoutSlice.reducer;
export const layoutAction = layoutSlice.actions;
export default layoutReducer;
