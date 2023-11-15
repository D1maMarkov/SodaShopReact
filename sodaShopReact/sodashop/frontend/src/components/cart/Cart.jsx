import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../hooks/useCart";
import "./Cart.scss";


export const Cart = ({cart, setCart, setOpenCart, setLenCart}) => {

    const navigate = useNavigate();

    function CloseCart(){
        $(".cart").css("right", "-40vw");
        $("body").css("position", "auto");
        $("body").css("overflow-y", "auto");
        $("body").css("filter", "auto");
        $(".darkbg").css("width", "0px");
        $(".cart").css("box-shadow", "0px 0px 0px gray");
        setOpenCart(false);
    }

    
    function remove_from_cart(product){
        let xhttp = new XMLHttpRequest();
        setCart(cart.filter((item) => item.product.id != product));
        xhttp.open("GET", "/cart/cart_remove/" + product + "/");
        xhttp.send();
    }
    
    function add_quantity(product){
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/cart/cart_add/" + product + "/");
        xhttp.send();

        for (let i = 0; i < cart.length; i++){
            if (cart[i].product.id == product){
                cart[i].quantity++;
            }
        }
     
        setCart([...cart]);
    }

    function remove_quantity(product){
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/cart/cart_low_quantity/" + product + "/");
        xhttp.send();

        let zero = false;
        for (let i = 0; i < cart.length; i++){
            if (cart[i].product.id == product){
                cart[i].quantity--;
                console.log(cart[i].quantity);
                if (cart[i].quantity == 0){
                    zero = true;
                }
            }
        }
        
        if (!zero){
            setCart([...cart]);
        }
        else{
            remove_from_cart(product);
        }
    }

    const initialValue = 0;
    const [totalPrice, setTotalPrice] = useState(0);
    

    useEffect(() => getCart(setCart), []);

    useEffect(() => setLenCart(cart.map(item => item.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)), [cart]);

    useEffect(() => {
        setTotalPrice(cart.map(item =>
            item.product.price * item.quantity 
        ).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue));
    }, [cart]);


    return (
        <div class="cart">
            <div style={{ margin: "25px",  fontSize: "20px", display: "flex" }}>
                <p style={{ fontSize: "40px", marginTop: "10px", marginBottom: "0px" }}>Your cart</p>
                <img onClick={CloseCart} id="maincross" src="https://cdn3.iconfinder.com/data/icons/status/100/close_1-1024.png"/>
            </div>
            {cart != undefined && cart.length == 0 ? (
                <>                
                    <p style={{ fontSize: "20px", marginLeft: "50px" }}>The basket is empty. Add at least one product to the cart</p>
                </>
            ):(<></>)}
            
                <hr />
                {cart.map((item) =>
                    <div className="product">
                        <img class="cartimg" src={item.product.image} />
                        <div class="product-description">
                            <div class="container4text">
                                <a><b>{ item.product.name }</b></a>
                                <a class="littledescription">{ item.product.description }</a>
                            </div>

                            <div class="quantity">
                                <div onClick={() => remove_quantity(item.product.id)} className="quantityselector">
                                <a style={{ lineHeight: "23px", display: "block" }} >-</a>
                                </div>

                                <a style={{ marginRight: "15px", marginLeft: "15px" }}>{ item.quantity }</a>

                                <div onClick={() => add_quantity(item.product.id)} className="quantityselector">
                                    <a style={{ lineHeight: "21px", display: "block" }} >+</a>
                                </div>
                            </div>

                            <div class="container4price">
                                <a class="price" >{item.product.price} $</a>
                            </div>
                        </div>
                        <div class="container4cross" onClick={() => remove_from_cart(item.product.id)}>
                            <img class="cross" src="https://cdn3.iconfinder.com/data/icons/status/100/close_1-1024.png"/>
                        </div>
                    </div>

                )}

                {cart != undefined && cart.length != 0 ? (
                    <hr id="endhr" />
                ):(<></>)}
           
            <div style={{ float: "right", marginRight: "5vw", fontSize: "25px" }}>
                <a>Total: </a>
                <a>{ totalPrice }</a>
                <a>$</a>
            </div>
            
            {cart.length > 0 ? (
                <button onClick={() => navigate("/orderForm")} id="buy">Buy</button>
            ):(
                <button style={{ cursor: "not-allowed" }} disabled id="buy">Buy</button>
            )
            }
        </div>
    )
}