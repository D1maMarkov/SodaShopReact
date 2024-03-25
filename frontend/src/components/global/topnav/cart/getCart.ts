import { useDispatch } from "react-redux";
import { initialValue } from "../../../../state/cart/cartSlice";


export const getCart = () => {
    const dispatch = useDispatch();

    fetch("/cart/get")
        .then(response => response.json())
        .then(response => {
            dispatch(initialValue(response));
    })
}
