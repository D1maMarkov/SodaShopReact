import React, { useState, useEffect } from "react";
import { Blobs } from "../blobs/Blobs";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { Topnav } from "../topnav/Topnav";
import { Cart } from "../cart/Cart";


export const Profile = () => {
    window.scrollTo(0, 0);
    document.body.style.height = "100%";
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [len_cart, setLenCart] = useState(0);

    function get_user(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setUsername(xhttp.response.username);
                setEmail(xhttp.response.email);
            }
        }
    
        xhttp.open("GET", "/user/get_user_info");
        xhttp.send();
    }

    function getOrders(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setOrders(xhttp.response);
                if (xhttp.response.length > 0){
                    document.body.style.overflowY = "auto";
                }
            }
        }
    
        xhttp.open("GET", "/getOrders");
        xhttp.send();
    }

    function logout(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                navigate("/");
            }
        }
    
        xhttp.open("GET", "/user/logout");
        xhttp.send();
    }

    useEffect(() => {
        get_user();
        getOrders();
    }, []);

    const [orders, setOrders] = useState([]);

    const [username, setUsername] = useState("username");
    const [email, setEmail] = useState("emial");

    return (
        <>
        <Topnav len_cart={len_cart} type={"mainPage"} color={"white"} />
        <Cart cart={cart} setCart={setCart} setLenCart={setLenCart} />
        <Blobs colors={["#d97aa9", "#a0004f"]} />
        <div className={styles.profile} >
            <p style={{ color: "rgb(250, 210, 210)" }}>Username</p>
            <p class={styles.userinfo}>{ username }</p><br />
            <p style={{ color: "rgb(250, 210, 210)" }}>Email</p>
            <p class={styles.userinfo} >{ email }</p><br />
            <p style={{ color: "rgb(250, 210, 210)" }}>Orders</p>
            {orders.length > 0 ? (
                orders.map((order, ind) =>
                
                    <div className={styles.order_products}>
                        <div className={styles.order_date}>
                            <p>{ order.curent_date }</p>                      
                            <p>price: { order.price } $</p>
                        </div>
                        <div className={styles.order_list} >
                            {order.orderlist.map(product => 
                                <div className={styles.order_product}>
                                    <img src={ product.product.image } />
                                    <div className={styles.order_product_description}>
                                        <p>{ product.product.name }</p>
                                        <p>{ product.product.description }</p>
                                        <p>quantity: { product.quantity }</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            ):(
                <p style={{ position: "relative", left: "30px", color: "rgb(250, 210, 210)" }}>You have no any orders</p>
            )}
            <div style={{ marginTop: "50px", paddingBottom: "100px" }}>
                <a style={{ textDecoration: "none", cursor: "pointer", marginTop: "50px", color: "rgb(250, 210, 210)" }} onClick={logout}>Log out</a>
            </div>
        </div>
        </>
    )
}