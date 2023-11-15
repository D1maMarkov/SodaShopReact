import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { SodaBlock } from "./SodaBlock";
import "./main.scss";


export const Soda = () => {
    document.body.style.background = "linear-gradient(45deg, rgb(110, 100, 120), rgb(250, 250, 250))";
    document.body.style.height = "100vh";
    
    const params = useParams();

    const [Products, setProducts] = useState(undefined);

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

    function product(Product){
        $("#product_title").text(Product.name);
        const currentBackColor = window.getComputedStyle( document.body, null).getPropertyValue('background');
        const grad2 = currentBackColor.slice(currentBackColor.indexOf("line"), currentBackColor.indexOf("))") + 2);
        $("body").css("background", Product.gradient);
        $(".bodyafter").css("background", grad2);
        $(".bodyafter").addClass("animcontainer");
        $(".description").css("color", "white");
        $("#blob2").empty();
        var string = '<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg"><path id="blob2" d="M483,297Q476,344,414.5,348.5Q353,353,348.5,415Q344,477,297,461.5Q250,446,219.5,421.5Q189,397,157,386Q125,375,107.5,345.5Q90,316,62.5,283Q35,250,38,207Q41,164,110,171.5Q179,179,167,99.5Q155,20,202.5,65.5Q250,111,281,105.5Q312,100,351,105Q390,110,384.5,153.5Q379,197,434.5,223.5Q490,250,483,297Z" fill="#' + Product.blob1 + '"></path></svg>'
        $("#blob2").html(string);
        $("#blob1").empty();
        var string = '<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">            <path id="blob" d="M483,297Q476,344,414.5,348.5Q353,353,348.5,415Q344,477,297,461.5Q250,446,219.5,421.5Q189,397,157,386Q125,375,107.5,345.5Q90,316,62.5,283Q35,250,38,207Q41,164,110,171.5Q179,179,167,99.5Q155,20,202.5,65.5Q250,111,281,105.5Q312,100,351,105Q390,110,384.5,153.5Q379,197,434.5,223.5Q490,250,483,297Z" fill="#' + Product.blob2 + '"></path></svg>'
        $("#blob1").html(string);
        setTimeout(function(){
            $(".bodyafter").removeClass("animcontainer");
        }, 1000);
    }

    return (
        <SodaBlock Products={Products} product={product} />
    )
}