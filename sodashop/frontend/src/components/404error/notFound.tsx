import { FC, useState } from "react";
import { Topnav } from "../Topnav/Topnav";
import { Blobs } from "../Blobs/Blobs";
import { Cart } from "../Cart/Cart";
import styles from "./notFound.module.scss";


export const Page404:FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    return(
        <>
        <Topnav color={"white"}/>
        <Cart />
        <h1 id={styles.not_found}>404 not found</h1>
        <Blobs />
        </>
    )
}