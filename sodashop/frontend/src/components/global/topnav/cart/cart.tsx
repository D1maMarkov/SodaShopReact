import { FC, useState, useEffect, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TypeCartProduct } from "../../../types";
import { initialValue } from "../../../../state/cart/cartSlice";
import { RootState } from "../../../../state/store";
import { updateLenght } from "../../../../state/cart/cartLenSlice";
import { CartProuct } from "./proudct/product";
import styles from "./cart.module.scss";


type TypeCart = {
    opened: boolean,
    setOpen: Dispatch<boolean>
}

export const Cart: FC<TypeCart> = ({opened, setOpen}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartInitialised = useSelector((state: RootState) => state.cart.initialised);

    const [totalPrice, setTotalPrice] = useState<number>(0);

    const getCart = () => {
        fetch("/cart/get")
        .then(response => response.json())
        .then(response => {
            dispatch(initialValue(response));
        })
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
        <aside className={styles.cart + " " + (opened ? styles.opened : "")}>
            <div className={styles.cart__header}>
                <p>Your cart</p>
                <img onClick={() => setOpen(false)} className={styles.main__cross} src="https://cdn3.iconfinder.com/data/icons/status/100/close_1-1024.png"/>
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
        </aside>
    )
};