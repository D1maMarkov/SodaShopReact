import { FC, useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TypeCartProduct } from "../types";
import { initialValue } from "../../state/cart/cartSlice";
import { RootState } from "../../state/store";
import { updateLenght } from "../../state/cart/cartLenSlice";
import { CartProuct } from "./Proudct/Product";
import styles from "./Cart.module.scss";


export const CartComponent: any = forwardRef<HTMLDivElement>(function CartComponent(props, ref) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartInitialised = useSelector((state: RootState) => state.cart.initialised);

    const [totalPrice, setTotalPrice] = useState<number>(0);

    function CloseCart(){
        const cartElem = document.getElementsByClassName(styles.cart)[0] as HTMLElement;
        cartElem.style.right = "-40vw";
        cartElem.style.boxShadow = "0px 0px 0px gray";
        document.body.style.overflowY = "auto";
    }

    const getCart = () => {
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                dispatch(initialValue(xhttp.response));
            }
        }
    
        xhttp.open("GET", "/cart/get");
        xhttp.send();
    }

    useEffect(() => {
        if (!cartInitialised){
            getCart();
        }
    }, []);

    useEffect(() => {dispatch(updateLenght(cart))}, [cart]);

    useEffect(() => {
        setTotalPrice(cart.map((item: TypeCartProduct) =>
            item.price * item.quantity 
        ).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0));
    }, [cart]);

    return (
        <div className={styles.cart} ref={ref}>
            <div className={styles.cart__header}>
                <p>Your cart</p>
                <img onClick={CloseCart} className={styles.main__cross} src="https://cdn3.iconfinder.com/data/icons/status/100/close_1-1024.png"/>
            </div>
            {cart != undefined && cart.length == 0 ? (
                <>                
                    <p style={{ fontSize: "20px", marginLeft: "50px" }}>The basket is empty. Add at least one product to the cart</p>
                </>
            ):(<></>)}
            
                <hr />
                {cart.map((product: TypeCartProduct) =>
                    <CartProuct product={product} />
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
                <button onClick={() => navigate("/order-form")} id={styles.buy}>Buy</button>
            ):(
                <button style={{ cursor: "not-allowed" }} disabled id={styles.buy}>Buy</button>
            )
            }
        </div>
    )
});