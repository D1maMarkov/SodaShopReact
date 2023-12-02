import React, { FC, useState } from "react";
import { Topnav } from "../Topnav/Topnav";
import { Blobs } from "../Blobs/Blobs";
import { Cart } from "../Cart/Cart";
import { TypeCartProduct } from "../types";
import styles from "./notFound.module.scss";


export const Page404:FC = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";
    document.body.style.height = "100vh";

    const [cart, setCart] = useState<TypeCartProduct[]>([]);
    const [len_cart, setLenCart] = useState<number>(0);

    return(
        <>
        <Topnav len_cart={len_cart} type={"mainPage"} color={"white"}/>
        <Cart cart={cart} setCart={setCart} setLenCart={setLenCart}/>
        <h1 id={styles.notfound}>404 not found</h1>
        <Blobs />
        </>
    )
}