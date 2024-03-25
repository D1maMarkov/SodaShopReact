import { FC } from "react";
import { Topnav } from "../../components/global/topnav/topnav";
import { Blobs } from "../../components/global/blobs/blobs";
import styles from "./notFound.module.scss";


const Page404:FC = () => {
    return(
        <>
        <Topnav />
        <h1 id={styles.not_found}>404 not found</h1>
        <Blobs />
        </>
    )
}

export default Page404;
