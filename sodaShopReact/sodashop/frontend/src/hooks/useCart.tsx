import { Dispatch, SetStateAction } from "react";
import { TypeCartProduct } from "../components/types";


export const getCart = (setCart: Dispatch<SetStateAction<TypeCartProduct[]>>) => {
    let xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            setCart(xhttp.response);
        }
    }

    xhttp.open("GET", "/cart/get_cart");
    xhttp.send();
}

