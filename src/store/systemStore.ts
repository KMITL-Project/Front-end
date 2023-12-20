import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  sidebarOpen: boolean;
  expandMenu: string[];
}

const initialState: CounterState = {
  sidebarOpen: false,
  expandMenu: [],
};

export const systemStore: any = createSlice({
  name: "counter",
  initialState,
  reducers: {
    sidebarIsOpen: (state) => {
      state.sidebarOpen = true;
    },
    sidebarIsClose: (state) => {
      state.sidebarOpen = false;
    },
    sidebarIsToggle: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    expandMenuIsOpen: (state, action: PayloadAction<string>) => {
      state.expandMenu = [action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  sidebarIsClose,
  sidebarIsOpen,
  sidebarIsToggle,
  expandMenuIsOpen,
} = systemStore.actions;

export default systemStore.reducer;
