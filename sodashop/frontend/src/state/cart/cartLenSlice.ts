import { TypeCartProduct } from "../../components/types"
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


type TypeCartLenState = {
    len: number,
}

const initialState: TypeCartLenState = {
    len: 0,
}

const cartLenSlice = createSlice({
    name: "len",
    initialState,
    reducers: {
        updateLenght: (state, action: PayloadAction<TypeCartProduct[]>) => {
            state.len = action.payload.map((item: TypeCartProduct) => item.quantity).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
        }
    }
});

export const { updateLenght } = cartLenSlice.actions;

export default cartLenSlice.reducer;
