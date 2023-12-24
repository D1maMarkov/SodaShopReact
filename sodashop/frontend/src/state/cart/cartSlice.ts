import { TypeCartProduct, TypeProduct } from "../../components/types"
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


type TypeCartState = {
    cart: TypeCartProduct[],
    initialised: boolean,
}

const initialState: TypeCartState = {
    cart: [],
    initialised: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        initialValue: (state, action: PayloadAction<TypeCartProduct[]>) => {
            state.cart = action.payload;
            state.initialised = true;
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item : TypeCartProduct) => item.id != action.payload);
        },
        removeQuantity: (state, action: PayloadAction<number>) => {
            let zero:boolean = false;
            for (let i = 0; i < state.cart.length; i++){
                if (state.cart[i].id == action.payload){
                    state.cart[i].quantity--;
                    if (state.cart[i].quantity == 0){
                        zero = true;
                    }
                }
            }
            
            if (zero){
                state.cart = [...state.cart.filter((item : TypeCartProduct) => item.id != action.payload)];
            }
        },
        addQuantity: (state, action: PayloadAction<TypeProduct>) => {
            let added = false;
            for (let i = 0; i < state.cart.length; i++){
                if (state.cart[i].id == action.payload.id){
                    state.cart[i].quantity++;
                    added = true;
                }
            }

            if (!added){
                let currProduct: TypeCartProduct = {...action.payload, quantity: 1 }
                state.cart = [...state.cart, currProduct];
            }
        }
    },
});

export const { addQuantity, initialValue, removeQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
