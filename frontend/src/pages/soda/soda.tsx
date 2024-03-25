import { FC, useState, useEffect } from "react";
import { Blobs } from "../../components/global/blobs/blobs";
import { Topnav } from "../../components/global/topnav/topnav";
import { RotateSoda } from "./rotate";
import { MyButton } from "../../components/addToCartButton/addToCartButton";
import { ProductRating } from "../../components/rating/rating";
import { getProducts } from "./getProducts";
import styles from "./soda.module.scss";


const Soda:FC = () => {
    const Products = getProducts();

    const [color, setColor] = useState<number>(0);
    const [anim, setAnim] = useState<boolean>(false);
    const [gradient1, setGradient1] = useState<string>("");
    const [gradient2, setGradient2] = useState<string>("");

    useEffect(() => {
        if (Products[color] !== undefined){
            document.title = Products[color].name + " | " + Products[color].description;
        }
    }, [color, Products])

    return (
        Products.length > 0 ? (
            <>
            <Topnav type={"simple"} />
            <Blobs colors={[Products[color].blob1, Products[color].blob2]} overflow={"hidden"}/>

            <div style={{ background: gradient1}} className={styles.bodyafter}></div>
            <div style={{ background: gradient2, zIndex: "-1" }} className={styles.bodyafter + " " + (anim ? styles.animcontainer : "")}>
            </div>
            <section className={styles.description}>
                <div title="send feedback">
                    <ProductRating productId={Products[color].id}/>
                </div>
                <p>{ Products[color].name }</p>
                <a>Carbonated soft drink produced by Coca-Cola. Originally marketed as a drink to replace alcohol and intended as a patent medicine, it was invented in the late 19th century by John Stith Pemberton and was bought out by businessman Asa Griggs Candler, whose marketing tactics led Coca-Cola to dominate the global soft drinks market throughout the twentieth century.</a>
                <MyButton product={Products[color]} />
            </section>
            <RotateSoda
                Products={Products}
                color={color}
                setColor={setColor}
                gradient1={gradient1}
                setGradient1={setGradient1}
                setGradient2={setGradient2}
                anim={anim}
                setAnim={setAnim}
                />
            </>
        ):(
            <></>
        )
    )
}

export default Soda;
