import { FC, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Blobs } from "../Blobs/Blobs";
import { Cart } from "../Cart/Cart";
import { Topnav } from "../Topnav/Topnav";
import { RotateSoda } from "./Rotate";
import { MyButton } from "./addToCartButton";
import { ProductRating } from "./Rating";
import { TypeProduct } from "../types";
import "./main.scss";


export const Soda:FC = () => {    
    const params = useParams();

    const [Products, setProducts] = useState<TypeProduct[]>();

    const [color, setColor] = useState<number>(0);

    function getProduct(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setTimeout(() => product(xhttp.response[0]), 500);
                setProducts(xhttp.response);
            }
        }
    
        xhttp.open("GET", "/get-product/" + params.category + "/" + params.color);
        xhttp.send();
    }

    function product(Product: TypeProduct){
        const currentBackColor = window.getComputedStyle( document.body, null).getPropertyValue('background');
        const grad2 = currentBackColor.slice(currentBackColor.indexOf("line"), currentBackColor.indexOf("))") + 2);
        $("#rotate *").css("pointer-events", "none");
        $("body").css("background", Product.gradient);
        $(".bodyafter").css("background", grad2);
        $(".bodyafter").addClass("animcontainer");
        setTimeout(function(){
            $(".bodyafter").removeClass("animcontainer");
        }, 1000);
    }

    useEffect(getProduct, []);

    return (
        Products != undefined ? (
            <>
            <Topnav type={"simple"} color={"white"} />
            <Cart />
            <Blobs colors={[Products[color].blob1, Products[color].blob2]} overflow={"hidden"}/>
            <div className="bodyafter"></div>
            <div className="description">
                <div title="send feedback">
                    <ProductRating product={Products[color]} />
                </div>
                <p>{Products[color].name}</p>
                <a>Carbonated soft drink produced by Coca-Cola. Originally marketed as a drink to replace alcohol and intended as a patent medicine, it was invented in the late 19th century by John Stith Pemberton and was bought out by businessman Asa Griggs Candler, whose marketing tactics led Coca-Cola to dominate the global soft drinks market throughout the twentieth century.</a>
            </div>
            <RotateSoda Products={Products} product={product} color={color} setColor={setColor} />
            <MyButton product={Products[color]} />
        </>
        ):(
            <></>
        )
    )
}