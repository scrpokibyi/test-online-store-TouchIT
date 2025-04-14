import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart.slice";
import filtersReducer from "./filters.slice";
import { saveState } from "./storage";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
  },
});

store.subscribe(() => {
  saveState("cartData", store.getState().cart);
  saveState("filtersData", store.getState().filters);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
