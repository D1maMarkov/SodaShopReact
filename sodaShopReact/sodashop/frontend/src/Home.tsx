import { useState, useEffect } from "react";
import { Topnav } from "./components/Topnav/Topnav";
import { Blobs } from "./components/Blobs/Blobs";
import { Cart } from "./components/Cart/Cart";
import { useNavigate } from "react-router-dom";
import { TypeCartProduct } from "./components/types";
import BlobStyles from "./components/Blobs/blobs.module.scss";
import "./Home.scss";
import { Footer } from "./components/Footer/footer";


export const Home = () => {
    document.body.style.overflow = "auto";
    document.body.style.background = "white";

    const [popularProducts, setPopularProducts] = useState<TypeCartProduct[]>([]);
    const navigate = useNavigate();

    function get_popular_product(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setPopularProducts(xhttp.response);
            }
        }
    
        xhttp.open("GET", "/getPopularProducts");
        xhttp.send();
    }

    useEffect(get_popular_product, []);

    return (
        <>  
            <Topnav color={"white"} />
            <Cart />
            <div id="bg">
                <Blobs style={{ position: "absolute" }} overflow={""} />
                <div className={"title"} >
                    <h1>SodaStock</h1>
                    <p>an online store where you can buy carbonated drinks according to taste and color. everyone will find something of their own</p>
                </div>

                <img id="mice" src="static/frontend/img/index/main.png"/>
                <img id="wave1" src="static/frontend/img/index/wave.svg"/>
                <img id="wave2" src="static/frontend/img/index/wave.svg"/>
            </div>

            <div className="blockimg">
                <div id="energycontainer" className="sodacontainer">
                    <img src="static/frontend/img/index/energy.jpg" />
                </div>
                <div className="secondblock">
                    <div className="secondblockimgs">
                        <div className="sodacontainer">
                            <img src="static/frontend/img/index/coke.webp" />
                        </div>
                        <div className="sodacontainer">
                            <img src="static/frontend/img/index/dora.jpg" />
                        </div>
                    </div>
                    <p>all drinks, starting with soda without sugar and ending with energy drinks</p>
                </div>
                <img id="wave3" src="static/frontend/img/index/whitewave.svg"/>
            </div>

            <div className="popular_products_block">
                <div className="popular_products_header">
                    <p>Popular products</p>
                    <button onClick={() => navigate("/catalog")}>All products</button>
                </div>
                <div className="popular_products">
                    {popularProducts.map((product: TypeCartProduct) => 
                        <div className="popular_product" onClick={() => navigate("/soda/" + product.product.category + "/" + product.product.id)}>
                            <div className="popular_product_cart">
                                <img src={ product.product.image } />
                                <div>
                                    <p>{ product.product.name }</p>
                                    <p>{ product.product.description }</p>
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