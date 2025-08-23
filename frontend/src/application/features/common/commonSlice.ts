import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SideBarState {
  isOpen: boolean;
  reason: "user" | "system";
}

export interface CommonState {
  sideBar: SideBarState;
}

const initialState: CommonState = {
  sideBar: {
    isOpen: true,
    reason: "user",
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSideBarState(state, action: PayloadAction<SideBarState>) {
      state.sideBar = action.payload;
    },
  },
});

export default commonSlice.reducer;
export const { setSideBarState } = commonSlice.actions;
