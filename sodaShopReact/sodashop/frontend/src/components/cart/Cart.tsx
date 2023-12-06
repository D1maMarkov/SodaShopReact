import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialValue, add_quantity, remove_from_cart, remove_quantity } from "../../state/cart/cartSlice";
import { TypeCartProduct } from "../types";
import styles from "./Cart.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { removeFromCartSession, addQuantitySession, removeQuantitySession } from "../../hooks/useCart";
import { updateLenght } from "../../state/cart/cartLenSlice";


export const Cart: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart.cart);

    const [totalPrice, setTotalPrice] = useState<number>(0);

    function CloseCart(){
        $("." + styles.cart).css("right", "-40vw");
        $("." + styles.cart).css("box-shadow", "0px 0px 0px gray");
        $("body").css("position", "");
        $("body").css("overflow-y", "auto");
    }

    const getCart = () => {
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                dispatch(initialValue(xhttp.response));
            }
        }
    
        xhttp.open("GET", "/cart/get_cart");
        xhttp.send();
    }
    

    useEffect(getCart, []);


    useEffect(() => {dispatch(updateLenght(cart))}, [cart]);

    useEffect(() => {
        setTotalPrice(cart.map((item: TypeCartProduct) =>
            item.product.price * item.quantity 
        ).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0));
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
                                <div onClick={() => {dispatch(remove_quantity(product.product.id)); removeQuantitySession(product.product.id)}} className={styles.quantityselector}>
                                    <a style={{ lineHeight: "21px", display: "block" }} >-</a>
                                </div>

                                <a style={{ marginRight: "15px", marginLeft: "15px" }}>{ product.quantity }</a>

                                <div onClick={() => {dispatch(add_quantity(product.product)); addQuantitySession(product.product.id)}} className={styles.quantityselector}>
                                    <a style={{ lineHeight: "23px", display: "block" }} >+</a>
                                </div>
                            </div>

                            <div className={styles.container4price}>
                                <a className={styles.price}>{product.product.price} $</a>
                            </div>
                        </div>
                        <div className={styles.container4cross} onClick={() => {dispatch(remove_from_cart(product.product.id)); removeFromCartSession(product.product.id)}}>
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