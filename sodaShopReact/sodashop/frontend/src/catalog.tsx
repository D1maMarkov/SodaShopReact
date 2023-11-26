import React, {useState, useEffect} from "react";
import { Slider } from "./components/Catalog/slider";
import { Blobs } from "./components/blobs/Blobs";
import { Topnav } from "./components/topnav/Topnav";
import { Cart } from "./components/cart/Cart";
import { TypeCartProduct } from "./components/types";
import { TypeImage } from "./components/types";


export const Catalog = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.body.style.background = "linear-gradient(45deg, rgb(110, 100, 120), rgb(250, 250, 250))";

    const [cart, setCart] = useState<TypeCartProduct[]>([]);
    const [len_cart, setLenCart] = useState<number>(0);

    const [ProdImgs, setImgs] = useState<TypeImage[]>([]);

    function shuffleArray(array : TypeImage[]) {
        for (let i: number = array.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getProducts(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setImgs(shuffleArray(xhttp.response));
            }
        }
        xhttp.open("GET", "/getProducts");
        xhttp.send();
    }


    useEffect(getProducts, []);
   
    return (
        <>
            <Topnav len_cart={len_cart} type={"black"} color={"black"}/>
            <Cart cart={cart} setCart={setCart} setLenCart={setLenCart}/>
            <Blobs colors={["60577e", "af9de8"]} />
            <Slider slider={ProdImgs} />
        </>
    );
}