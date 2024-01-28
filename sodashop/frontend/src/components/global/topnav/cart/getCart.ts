import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialValue } from "../../../../state/cart/cartSlice";


export const getCart = () => {
   // const [cart, setCart] = useState([]);

    const dispatch = useDispatch();


    fetch("/cart/get")
        .then(response => response.json())
        .then(response => {
            dispatch(initialValue(response));
    })
   
}