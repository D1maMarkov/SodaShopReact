import { FC, useState, useEffect } from "react";
import { Topnav } from "../Topnav/Topnav";
import { Blobs } from "../Blobs/Blobs";
import { Cart } from "../Cart/Cart";
import { useNavigate } from "react-router-dom";
import { TypeProduct } from "../types";
import { Footer } from "../Footer/footer";
import "./Home.scss";


export const Home: FC = () => {
    document.body.style.background = "white";

    const [popularProducts, setPopularProducts] = useState<TypeProduct[]>([]);
    const navigate = useNavigate();

    function getPopularProduct(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setPopularProducts(xhttp.response);
            }
        }
    
        xhttp.open("GET", "/get-popular-products");
        xhttp.send();
    }

    useEffect(getPopularProduct, []);

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

            <div className="popular__products__block">
                <div className="popular__products__header">
                    <p>Popular products</p>
                    <button onClick={() => navigate("/catalog")}>All products</button>
                </div>
                <div className="popular__products">
                    {popularProducts.map((product: TypeProduct) =>
                        <div className="popular__product" onClick={() => navigate("/soda/" + product.category + "/" + product.id)}>
                            <div className="popular__product__cart">
                                <img src={ product.image } />
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