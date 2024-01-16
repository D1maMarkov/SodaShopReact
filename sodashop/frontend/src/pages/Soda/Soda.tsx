import { FC, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Blobs } from "../../components/Blobs/Blobs";
import { Topnav } from "../../components/Topnav/Topnav";
import { RotateSoda } from "./Rotate";
import { MyButton } from "../../components/AddToCartButton/addToCartButton";
import { ProductRating } from "../../components/Rating/Rating";
import { TypeProduct } from "../../components/types";
import "./main.scss";


export const Soda:FC = () => {    
    const params = useParams();

    const [Products, setProducts] = useState<TypeProduct[]>([]);

    const [color, setColor] = useState<number>(0);

    function getProduct(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setProducts(xhttp.response);
            }
        }
    
        xhttp.open("GET", `/get-product/${params.category}/${params.color}`);
        xhttp.send();
    }

    useEffect(getProduct, []);
    
    return (
        Products.length > 0 ? (
            <>
            <Topnav type={"simple"} />
          
            <Blobs colors={[Products[color].blob1, Products[color].blob2]} overflow={"hidden"}/>
            <div className="bodyafter"></div>
            <div className="description">
                <div title="send feedback">
                    <ProductRating productId={Products[color].id}/>
                </div>
                <p>{Products[color].name}</p>
                <a>Carbonated soft drink produced by Coca-Cola. Originally marketed as a drink to replace alcohol and intended as a patent medicine, it was invented in the late 19th century by John Stith Pemberton and was bought out by businessman Asa Griggs Candler, whose marketing tactics led Coca-Cola to dominate the global soft drinks market throughout the twentieth century.</a>
            </div>
            <RotateSoda Products={Products} color={color} setColor={setColor} />
            <MyButton product={Products[color]} />
            </>
        ):(
            <></>
        )
    )
}