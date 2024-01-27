import { FC } from "react";
import { Slider } from "./slider";
import { Blobs } from "../../components/global/blobs/blobs";
import { Topnav } from "../../components/global/topnav/topnav";
import { getProducts } from "./getProducts";
import styles from "./slider.module.scss";


export const Catalog:FC = () => {
    const products = getProducts();

    return (
        <div className={styles.wrapper}>
            <Topnav type={"simple"} color={"black"}/>
            <Blobs colors={["60577e", "af9de8"]} overflow={"hidden"}/>
            <Slider slider={products} />
        </div>
    );
}