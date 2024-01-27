import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { TypeProduct } from "../../components/types";
import { Footer } from "../../components/global/footer/footer";
import { getPopularProduct } from "./getPopularProducts";
import styles from "./home.module.scss";
import { Topnav } from "../../components/global/topnav/topnav";
import { Blobs } from "../../components/global/blobs/blobs";


export const Home: FC = () => {
    const popularProducts = getPopularProduct();
    const navigate = useNavigate();

    return (
        <>
        <Topnav />
        <Blobs overflow={""} />
        
        <div id={styles.bg}>
            <div className={styles.title}>
                <h1>SodaStock</h1>
                <p>an online store where you can buy carbonated drinks according to taste and color. everyone will find something of their own</p>
            </div>

            <img id={styles.mice} src="static/frontend/img/index/main.webp"/>
            <img id={styles.wave1} src="static/frontend/img/index/wave.svg"/>
            <img id={styles.wave2} src="static/frontend/img/index/wave.svg"/>
        </div>

        <div className={styles.blockimg}>
            <div className={styles.inner}>
                <div id={styles.energycontainer} className={styles.sodacontainer}>
                    <img src="static/frontend/img/index/energy.jpg" />
                </div>
                <div className={styles.secondblock}>
                    <div className={styles.secondblockimgs}>
                        <div className={styles.sodacontainer}>
                            <img src="static/frontend/img/index/coke.webp" />
                        </div>
                        <div className={styles.sodacontainer}>
                            <img src="static/frontend/img/index/dora.jpg" />
                        </div>
                    </div>
                    <p>all drinks, starting with soda without sugar and ending with energy drinks</p>
                </div>
            </div>
            <img id={styles.wave3} src="static/frontend/img/index/wave.svg"/>
        </div>

        <div className={styles.popular__products__block}>
            <div className={styles.popular__products__header}>
                <p>Popular products</p>
                <button onClick={() => navigate("/catalog")}>All products</button>
            </div>
            <div className={styles.popular__products}>
                {popularProducts.map((product: TypeProduct) =>
                    <div className={styles.popular__product} onClick={() => navigate(`/soda/${product.category}/${product.id}`)}>
                        <div className={styles.popular__product__cart}>
                            <img src={product.image} alt={product.image}/>
                            <div>
                                <p>{ product.name }</p>
                                <p>{ product.description }</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>
    )
}