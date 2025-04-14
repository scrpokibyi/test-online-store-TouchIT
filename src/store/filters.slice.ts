import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const FILTERS_PERSISTENT_STATE = "filtersData";

export interface FiltersState {
  category: string;
  sortDirection: "asc" | "desc";
  itemsPerPage: number;
  searchTerm: string;
}

const initialState: FiltersState = loadState<FiltersState>(
  FILTERS_PERSISTENT_STATE
) ?? {
  category: "",
  sortDirection: "asc",
  itemsPerPage: 10,
  searchTerm: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortDirection = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    resetFilters: (state) => {
      state.category = "";
      state.sortDirection = "asc";
      state.searchTerm = "";
    },
  },
});

export default filtersSlice.reducer;
export const filtersActions = filtersSlice.actions;
