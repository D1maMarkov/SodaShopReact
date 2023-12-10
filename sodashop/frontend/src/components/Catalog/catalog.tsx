import { useState, useEffect, FC } from "react";
import { Slider } from "./slider";
import { Blobs } from "../Blobs/Blobs";
import { Topnav } from "../Topnav/Topnav";
import { Cart } from "../Cart/Cart";
import { TypeImage } from "../types";


export const Catalog:FC = () => {
    document.body.style.background = "linear-gradient(45deg, rgb(110, 100, 120), rgb(250, 250, 250))";

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
        xhttp.open("GET", "/get-products");
        xhttp.send();
    }

    useEffect(getProducts, []);

    return (
        <>
            <Topnav type={"simple"} color={"black"}/>
            <Cart />
            <Blobs colors={["60577e", "af9de8"]} overflow={"hidden"}/>
            <Slider slider={ProdImgs} />
        </>
    );
}