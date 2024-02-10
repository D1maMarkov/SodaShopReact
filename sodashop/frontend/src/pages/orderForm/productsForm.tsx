import { FC, useState, useEffect } from "react";
import { CartDemo } from "../../components/cartDemo/cartDemo";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { TypeCartProduct } from "../../components/types";
import styles from "./orderForm.module.scss";


type TypeProductsForm = {
    loading: boolean,
    deliveryPrice: number,
    getForm: () => void
}

export const ProductsForm: FC<TypeProductsForm> = ({loading, deliveryPrice, getForm}) => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setTotalPrice(cart.map((product: TypeCartProduct) => 
            product.price * product.quantity 
        ).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0));
    }, [cart]);

    return (
        <div className={styles.form}>
            <div style={{ marginLeft: "5%", width: "90%" }}>
                <div className={styles.space__beetween}>
                    <p>products</p>
                </div>

                <CartDemo cart={cart}></CartDemo>

                <div className={styles.space__beetween}>
                    <p>Delivery</p>
                    <p>{deliveryPrice}$</p>
                </div>

                <div className={styles.space__beetween}>
                    <p>Price</p>
                    <p>{totalPrice}$</p>
                </div>

                <div style={{ textAlign: "right" }}>
                    <p>total:  {totalPrice + deliveryPrice} $</p>
                </div>

                {loading || cart.length == 0 ? (
                    <button style={{cursor: "not-allowed"}} disabled className={styles.order__form__butt}>Buy</button>
                ):(
                    <button onClick={getForm} className={styles.order__form__butt}>Buy</button>
                )}
            </div>
        </div>
    )
}