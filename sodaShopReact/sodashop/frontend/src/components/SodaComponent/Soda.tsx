import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { SodaBlock } from "./SodaBlock";
import { TypeProduct } from "../types";
import "./main.scss";
import blobStyles from "../blobs/blobs.module.scss";


export const Soda = () => {
    document.body.style.background = "linear-gradient(45deg, rgb(110, 100, 120), rgb(250, 250, 250))";
    document.body.style.height = "100vh";
    
    const params = useParams();

    const [Products, setProducts] = useState<TypeProduct[]>();

    function getProduct(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setTimeout(() => product(xhttp.response[0]), 500);
                setProducts(xhttp.response);
            }
        }
    
        xhttp.open("GET", "/getProduct/" + params.category + "/" + params.color);
        xhttp.send();
    }


    useEffect(getProduct, []);

    function product(Product: TypeProduct){
        const currentBackColor = window.getComputedStyle( document.body, null).getPropertyValue('background');
        const grad2 = currentBackColor.slice(currentBackColor.indexOf("line"), currentBackColor.indexOf("))") + 2);
        $("body").css("background", Product.gradient);
        $(".bodyafter").css("background", grad2);
        $(".bodyafter").addClass("animcontainer");
        setTimeout(function(){
            $(".bodyafter").removeClass("animcontainer");
        }, 1000);
    }

    return (
        <SodaBlock Products={Products} product={product} />
    )
}