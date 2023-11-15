import React, {useState, useEffect} from "react";
import { Blobs } from "../blobs/Blobs";
import { Cart } from "../cart/Cart";
import { Topnav } from "../topnav/Topnav";
import { RotateSoda } from "./Rotate";
import { MyButton } from "./addToCartButton";
import { ProductRating } from "./Rating";


export const SodaBlock = ({Products, product}) => {

    const [len_cart, setLenCart] = useState(0);
    const [cart, setCart] = useState([]);

    const [color, setColor] = useState(Number(0));
    const [openCart, setOpenCart] = useState(false);

    useEffect(() => {
        if (!openCart){
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";
        }
    }, [openCart]);


    return (
        Products != undefined ? (
            <>
            <Topnav setOpenCart={setOpenCart} len_cart={len_cart} color={"white"} type={"white"} />
            <Cart setOpenCart={setOpenCart} cart={cart} setCart={setCart} setLenCart={setLenCart} />
            <Blobs colors={["#af9de8", "#60577e"]} />
            <div class="bodyafter"></div>
            <div class="description">
                <div title="send feedback">
                    <ProductRating product={Products[color]} />
                </div>
                <p id="product_title"></p>
                <a>Carbonated soft drink produced by Coca-Cola. Originally marketed as a drink to replace alcohol and intended as a patent medicine, it was invented in the late 19th century by John Stith Pemberton and was bought out by businessman Asa Griggs Candler, whose marketing tactics led Coca-Cola to dominate the global soft drinks market throughout the twentieth century.</a>
            </div>
            <RotateSoda Products={Products} product={product} color={color} setColor={setColor} />
            <MyButton setCart={setCart} cart={cart} product={Products[color]} />
        </>
        ):(
            <></>
        )
    )
}