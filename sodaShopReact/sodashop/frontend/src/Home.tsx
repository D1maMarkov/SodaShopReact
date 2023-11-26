import React, { useState, useEffect } from "react";
import { Topnav } from "./components/topnav/Topnav";
import { Blobs } from "./components/blobs/Blobs";
import { Cart } from "./components/cart/Cart";
import { useNavigate } from "react-router-dom";
import { TypeCartProduct, TypeProduct } from "./components/types";
import BlobStyles from "./components/blobs/blobs.module.scss";
import "./Home.scss";


export const Home = () => {
    document.body.style.overflow = "auto";
    document.body.style.background = "white";

    const [popularProducts, setPopularProducts] = useState<TypeCartProduct[]>([]);
    const navigate = useNavigate();

    const [cart, setCart] = useState<TypeCartProduct[]>([]);
    const [len_cart, setLenCart] = useState<number>(0);

    const initialValue: number = 0;

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

    useEffect(() => setLenCart(cart.map((product: TypeCartProduct) => product.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)), [cart]);


    useEffect(() => {
        setTimeout(() => {
            $("#" + BlobStyles.blob1).css("position", "absolute");
            $("#" + BlobStyles.blob2).css("position", "absolute");
        }, 1000)
    })

    return (
        <>  
            <Topnav len_cart={len_cart} type={"mainPage"} color={"white"} />
            <Cart cart={cart} setCart={setCart} setLenCart={setLenCart} />
            <Blobs />
            <div className="darkbg"></div>
            <div id="bg">
                <div>
                    <h1>SodaStock</h1>
                    <p>an online store where you can buy carbonated drinks according to taste and color. everyone will find something of their own</p>
                </div>

                <img id="mice" src="static/frontend/img/index/9mice.png"/>
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

            <div>
                <footer>
                    <div className="footer_text">
                        <div className="social">
                            <div className="social_text">
                                <a>Social network</a><br /><br />
                                <div style={{ height: "20px", marginBottom: "20px" }}>
                                    <img style={{ height: "20px", marginRight: "10px" }} src="/static/frontend/img/index/vk.png" />
                                    <li style={{ padding: "0px", lineHeight: "17px" }} >Vkontakte</li><br />
                                </div>

                                <div style={{ height: "20px" }}>
                                <img style={{ height: "20px", marginRight: "10px" }} src="/static/frontend/img/index/telegram.png" />
                                    <li style={{ padding: "0px", lineHeight: "17px" }} onClick={() => navigate('https://t.me/n3foooooor')} >Telegram</li><br />
                                </div>
                            </div>
                        </div>
                        <div className="social">
                            <div className="social_text">
                                <a>Online store</a><br /><br />
                                <li>+79505168534</li><br />
                                <li>+74429489248</li><br />
                            </div>
                        </div>
                        <div className="social">
                            <div className="social_text">
                                <a>Support</a><br /><br />
                                <li>Customer assistance</li><br />
                                <li>Delivery and payment</li><br />
                                <li>Refund</li><br />
                                <li>Loyalty Program</li><br />
                                <li>Partners</li>
                            </div>
                        </div>
                        <div className="social">
                            <div className="social_text">
                                <a>Information</a><br /><br />
                                <li>Contacts</li><br />
                                <li>The shops</li><br />
                                <li>The blog</li><br />
                                <li>Job openings</li><br />
                            </div>
                        </div>
                    </div>
                </footer>
                <div className="bottom">
                    <div className="bottom_imgs" >
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/mir.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/visa.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/mastercard.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/tinkoff.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/sberpay.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/yapay.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/ems.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/cdek.svg"/></span>
                    </div>
                    <div className="bottom_text">
                        <span><a>Ⓒ SODASTOCK MARKET, 2023</a></span>
                        <a>User agreement</a>
                        <a>Privacy Policy</a>
                        <a>Site map</a>
                    </div>
                </div>
            </div>
        </>
    )
}