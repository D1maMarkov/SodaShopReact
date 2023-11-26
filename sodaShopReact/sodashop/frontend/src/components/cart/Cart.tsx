import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../hooks/useCart";
import { TypeCartProduct } from "../types";
import styles from "./Cart.module.scss";
import { Dispatch, SetStateAction } from "react";


type TypeCart = {
    cart : TypeCartProduct[],
    setCart : Dispatch<SetStateAction<TypeCartProduct[]>>, 
    setOpenCart? : Dispatch<SetStateAction<boolean>> | undefined, 
    setLenCart: Dispatch<SetStateAction<number>>
}


export const Cart: FC<TypeCart> = ({cart, setCart, setOpenCart, setLenCart}) => {
    const navigate = useNavigate();

    const initialValue: number = 0;
    const [totalPrice, setTotalPrice] = useState<number>(0);

    function CloseCart(){
        $("." + styles.cart).css("right", "-40vw");
        $("." + styles.cart).css("box-shadow", "0px 0px 0px gray");
        $("body").css("position", "auto");
        $("body").css("overflow-y", "auto");
        $("body").css("filter", "auto");
        $("." + styles.darkbg).css("width", "0px");
        if(setOpenCart){
            setOpenCart(false);
        }
    }
    
    function remove_from_cart(product : number){
        let xhttp = new XMLHttpRequest();
        setCart(cart.filter((item : TypeCartProduct) => item.product.id != product));
        xhttp.open("GET", "/cart/cart_remove/" + product + "/");
        xhttp.send();
    }
    
    function add_quantity(product : number){
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

    function remove_quantity(product : number){
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/cart/cart_low_quantity/" + product + "/");
        xhttp.send();

        let zero:boolean = false;
        for (let i = 0; i < cart.length; i++){
            if (cart[i].product.id == product){
                cart[i].quantity--;
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
    

    useEffect(() => getCart(setCart), []);

    useEffect(() => setLenCart(cart.map((item: TypeCartProduct) => item.quantity).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, initialValue)), [cart]);

    useEffect(() => {
        setTotalPrice(cart.map((item: TypeCartProduct) =>
            item.product.price * item.quantity 
        ).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, initialValue));
    }, [cart]);


    return (
        <div className={styles.cart}>
            <div style={{ margin: "25px",  fontSize: "20px", display: "flex" }}>
                <p style={{ fontSize: "40px", marginTop: "10px", marginBottom: "0px" }}>Your cart</p>
                <img onClick={CloseCart} id={styles.maincross} src="https://cdn3.iconfinder.com/data/icons/status/100/close_1-1024.png"/>
            </div>
            {cart != undefined && cart.length == 0 ? (
                <>                
                    <p style={{ fontSize: "20px", marginLeft: "50px" }}>The basket is empty. Add at least one product to the cart</p>
                </>
            ):(<></>)}
            
                <hr />
                {cart.map((product: TypeCartProduct) =>
                    <div className={styles.product}>
                        <img className={styles.cartimg} src={product.product.image} />
                        <div className={styles.productDescription}>
                            <div className={styles.container4text}>
                                <a><b>{ product.product.name }</b></a>
                                <a className={styles.littledescription}>{ product.product.description }</a>
                            </div>

                            <div className={styles.quantity}>
                                <div onClick={() => remove_quantity(product.product.id)} className={styles.quantityselector}>
                                <a style={{ lineHeight: "23px", display: "block" }} >-</a>
                                </div>

                                <a style={{ marginRight: "15px", marginLeft: "15px" }}>{ product.quantity }</a>

                                <div onClick={() => add_quantity(product.product.id)} className={styles.quantityselector}>
                                    <a style={{ lineHeight: "21px", display: "block" }} >+</a>
                                </div>
                            </div>

                            <div className={styles.container4price}>
                                <a className={styles.price}>{product.product.price} $</a>
                            </div>
                        </div>
                        <div className={styles.container4cross} onClick={() => remove_from_cart(product.product.id)}>
                            <img className={styles.cross} src="https://cdn3.iconfinder.com/data/icons/status/100/close_1-1024.png"/>
                        </div>
                    </div>

                )}

                {cart != undefined && cart.length != 0 ? (
                    <hr id={styles.endhr} />
                ):(<></>)}
           
            <div style={{ float: "right", marginRight: "5vw", fontSize: "25px" }}>
                <a>Total: </a>
                <a>{ totalPrice }</a>
                <a>$</a>
            </div>
            
            {cart.length > 0 ? (
                <button onClick={() => navigate("/orderForm")} id={styles.buy}>Buy</button>
            ):(
                <button style={{ cursor: "not-allowed" }} disabled id={styles.buy}>Buy</button>
            )
            }
        </div>
    )
}