import React, { useState } from "react";
import { Topnav } from "../topnav/Topnav";
import { Blobs } from "../blobs/Blobs";
import { Cart } from "../cart/Cart";
import styles from "./notfound.module.css";


export const Page404 = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";
    document.body.style.height = "100vh";

    const [cart, setCart] = useState([]);
    const [len_cart, setLenCart] = useState(0);

    return(
        <>
        <Topnav len_cart={len_cart} type={"mainPage"} color={"white"} />
        <Cart cart={cart} setCart={setCart} setLenCart={setLenCart} />
        <h1 id={styles.notfound}>404 not found</h1>
        <Blobs colors={["#d97aa9", "#a0004f"]} />
        </>
    )
}