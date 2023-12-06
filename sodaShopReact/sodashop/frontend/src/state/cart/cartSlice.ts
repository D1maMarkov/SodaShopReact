import { TypeCartProduct, TypeProduct } from "../../components/types"
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


type TypeCartState = {
    cart: TypeCartProduct[],
}

const initialState: TypeCartState = {
    cart: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        initialValue: (state, action: PayloadAction<TypeCartProduct[]>) => {
            state.cart = action.payload;
        },
        remove_from_cart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item : TypeCartProduct) => item.product.id != action.payload);
        },
        remove_quantity: (state, action: PayloadAction<number>) => {
            let zero:boolean = false;
            for (let i = 0; i < state.cart.length; i++){
                if (state.cart[i].product.id == action.payload){
                    state.cart[i].quantity--;
                    if (state.cart[i].quantity == 0){
                        zero = true;
                    }
                }
            }
            
            if (zero){
                state.cart = [...state.cart.filter((item : TypeCartProduct) => item.product.id != action.payload)];
            }
        },
        add_quantity: (state, action: PayloadAction<TypeProduct>) => {
            let added = false;
            for (let i = 0; i < state.cart.length; i++){
                if (state.cart[i].product.id == action.payload.id){
                    state.cart[i].quantity++;
                    added = true;
                }
            }

            if (!added){
                let currProduct: TypeCartProduct = {
                    quantity: 1, 
                    price: action.payload.price, 
                    id: action.payload.id,
                    product: action.payload
                }
                state.cart = [...state.cart, currProduct];
            }
        }
    },
});

export const { add_quantity, initialValue, remove_from_cart, remove_quantity } = cartSlice.actions;

export default cartSlice.reducer;
