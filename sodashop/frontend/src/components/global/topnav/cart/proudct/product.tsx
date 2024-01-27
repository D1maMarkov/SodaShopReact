import { FC } from "react";
import { useDispatch } from "react-redux";
import { removeQuantity, removeFromCart, addQuantity } from "../../../../../state/cart/cartSlice";
import { removeQuantitySession, addQuantitySession, removeFromCartSession } from "../../../../../hooks/useCart";
import { TypeCartProduct } from "../../../../types";
import styles from "./Product.module.scss";


type TypeCartProductComponent = {
    product: TypeCartProduct,
}

export const CartProuct: FC<TypeCartProductComponent> = ({product}) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.product}>
            <img className={styles.product__img} src={product.image} alt={product.name}/>
            <div className={styles.product__description}>
                <div className={styles.container__text}>
                    <a><b>{ product.name }</b></a>
                    <a className={styles.little__description}>{ product.description }</a>
                </div>

                <div className={styles.quantity}>
                    <div onClick={() => {dispatch(removeQuantity(product.id)); removeQuantitySession(product.id)}} className={styles.quantity__selector}>
                        <a style={{ lineHeight: "23px", display: "block" }} >-</a>
                    </div>

                    <a style={{ margin: "0px 15px" }}>{ product.quantity }</a>

                    <div onClick={() => {dispatch(addQuantity(product)); addQuantitySession(product.id)}} className={styles.quantity__selector}>
                        <a style={{ lineHeight: "22px", display: "block" }} >+</a>
                    </div>
                </div>

                <div className={styles.container__price}>
                    <a className={styles.price}>{product.price} $</a>
                </div>
            </div>
            <div className={styles.container__cross} onClick={() => {dispatch(removeFromCart(product.id)); removeFromCartSession(product.id)}}>
                <img className={styles.cross} src="https://cdn3.iconfinder.com/data/icons/status/100/close_1-1024.png"/>
            </div>
        </div>
    )
}