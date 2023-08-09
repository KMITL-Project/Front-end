import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  sidebarOpen: boolean;
}

const initialState: CounterState = {
  sidebarOpen: false,
};

export const systemStore = createSlice({
  name: "counter",
  initialState,
  reducers: {
    sidebarIsOpen: (state) => {
      state.sidebarOpen = true;
    },
    sidebarIsClose: (state) => {
      state.sidebarOpen = false;
    },
    sideBarIsToggle: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { sidebarIsClose, sidebarIsOpen, sideBarIsToggle } =
  systemStore.actions;

export default systemStore.reducer;
