import React, { FC, useState, useEffect} from "react";
import { Blobs } from "../Blobs/Blobs";
import { Cart } from "../Cart/Cart";
import { Topnav } from "../Topnav/Topnav";
import { RotateSoda } from "./Rotate";
import { MyButton } from "./addToCartButton";
import { ProductRating } from "./Rating";
import { TypeCartProduct, TypeProduct } from "../types";


type TypeSodaBlock = {
    Products: TypeProduct[] | undefined,
    product: (Product: TypeProduct) => void
}

export const SodaBlock: FC<TypeSodaBlock> = ({Products, product}) => {

    const [len_cart, setLenCart] = useState<number>(0);
    const [cart, setCart] = useState<TypeCartProduct[]>([]);

    const [color, setColor] = useState<number>(0);
    const [openCart, setOpenCart] = useState<boolean>(false);

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
            <Blobs colors={[Products[color].blob1, Products[color].blob2]} />
            <div className="bodyafter"></div>
            <div className="description">
                <div title="send feedback">
                    <ProductRating product={Products[color]} />
                </div>
                <p>{Products[color].name}</p>
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