import { FC } from "react";
import { Topnav } from "../../components/Topnav/Topnav";
import { Blobs } from "../../components/Blobs/Blobs";
import styles from "./notFound.module.scss";


export const Page404:FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    return(
        <>
        <Topnav />
        <h1 id={styles.not_found}>404 not found</h1>
        <Blobs />
        </>
    )
}