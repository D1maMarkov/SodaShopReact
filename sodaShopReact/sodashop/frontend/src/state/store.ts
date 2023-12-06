import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import cartLenReducer from "./cart/cartLenSlice";


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        cartLenght: cartLenReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


