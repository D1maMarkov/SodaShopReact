import React, { useState, useEffect } from "react";
import { Topnav } from "./components/topnav/Topnav";
import { Blobs } from "./components/blobs/Blobs";
import { Cart } from "./components/cart/Cart";
import { useNavigate } from "react-router-dom";
import "./Home.css";


export const Home = () => {
    document.body.style.overflow = "auto";
    document.body.style.background = "white";

    const [popularProducts, setPopularProducts] = useState([]);
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [len_cart, setLenCart] = useState(0);

    const initialValue = 0;

    function get_popular_product(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setPopularProducts(xhttp.response);
                console.log(xhttp.response);
            }
        }
    
        xhttp.open("GET", "/getPopularProducts");
        xhttp.send();
    }

    useEffect(get_popular_product, []);

    useEffect(() => setLenCart(cart.map(item => item.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)), [cart]);


    useEffect(() => {
        setTimeout(() => {
            $("#blob1").css("position", "absolute");
            $("#blob2").css("position", "absolute");
        }, 100)
    })

    return (
        <>  
            <Topnav len_cart={len_cart} type={"mainPage"} color={"white"} />
            <Cart cart={cart} setCart={setCart} setLenCart={setLenCart} />
            <Blobs colors={["#d97aa9", "#a0004f"]} />
            <div class="darkbg"></div>
            <div id="bg">
                <div className="text">
                    <h1 className="disabledText">SodaStock</h1>
                    <p clasNames="disabledText">an online store where you can buy carbonated drinks according to taste and color. everyone will find something of their own</p>
                </div>

                <img id="mice" src="static/frontend/img/index/9mice.png"/>
                <img id="wave1" src="static/frontend/img/index/wave.svg"/>
                <img id="wave2" src="static/frontend/img/index/wave.svg"/>
            </div>

            <div className="blockimg">
                <div id="energycontainer" className="sodacontainer">
                    <img id="energy" src="static/frontend/img/index/energy.jpg" />
                </div>
                <div className="secondblock">
                    <div className="secondblockimgs">
                        <div id="cokecontainer" className="sodacontainer">
                            <img id="coke" src="static/frontend/img/index/coke.webp" />
                        </div>
                        <div id="doracontainer" className="sodacontainer">
                            <img id="dora" src="static/frontend/img/index/dora.jpg" />
                        </div>
                    </div>
                    <p>all drinks, starting with soda without sugar and ending with energy drinks</p>
                </div>
                <img id="wave3" src="static/frontend/img/index/whitewave.svg"/>
            </div>

            <div className="popular_products_block">
                <div className="popular_products_header" style={{ display: "flex",  width: "100%" }}>
                    <p style={{ fontSize: "50px", marginLeft: "50px" }}>Popular products</p>
                    <button onClick={() => navigate("/catalog")} id="all_products">All products</button>
                </div>
                <div className="popular_products">
                    {popularProducts.map(product => 
                        <div className="popular_product" onClick={() => navigate("/soda/" + product.product.category + "/" + product.product.id)}>
                            <div className="popular_product_cart" style={{ columns: "3" }}>
                                <img style={{ margin: "20px" }} src={ product.product.image } />
                                <div className="popular_product_description">
                                    <p style={{ fontSize: "25px" }}>{ product.product.name }</p>
                                    <p style={{ fontSize: "25px" }}>{ product.product.description }</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <footer className="footer">
                    <div className="footer_text">
                        <div className="social">
                            <a>Social network</a><br /><br />
                            <div className="abc">
                                <img id="zaq" src="https://cdn.onlinewebfonts.com/svg/download_2255.png" height="12"/>
                                <li>Vkontakte</li><br />
                            </div>
                            <div className="abc">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/></svg>
                                <li onclick="location.href='https://t.me/n3foooooor'">Telegram</li><br />
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
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/dolyame.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/tinkoff.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/sberpay.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/yapay.svg"/></span>
                        <span><img src="https://brandshop.ru/assets/images/footer-icons/russian-post.svg"/></span>
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