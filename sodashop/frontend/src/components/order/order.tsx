import { FC } from "react";
import { getOrders } from "./getOrders";
import { TypeOrder, OrderState, TypeCartProduct } from "../types";
import moment from "moment";
import styles from "./Order.module.scss";

export const Orders: FC = () => {
    const orders = getOrders();

    return (
        <>
        <p style={{ color: "rgb(250, 210, 210)" }}>Orders</p>
        {orders.length > 0 ? (
            orders.map((order: TypeOrder) =>
                <div className={styles.order__products}>
                    <div className={styles.order__date}>    
                                    
                        <p>{ moment(order.date).format("YYYY-MM-DD") }</p>                      
                        <p>price: { order.price } $</p>
                        {order.state == OrderState.pickUp ? (
                                <div style={{ backgroundColor: "#77e565" }} className={styles.order__state}>{ order.state }</div>    
                            ):(
                                <div className={styles.order__state}>{ order.state }</div> 
                            )
                        }           
                    </div>
                    <div className={styles.order__list} >
                       {order.products.map((product: TypeCartProduct) => 
                            <div className={styles.order__product}>
                                <img src={ product.image } alt={product.name}/>
                                <div className={styles.description}>
                                    <p>{ product.name }</p>
                                    <p>{ product.description }</p>
                                    <p>quantity: { product.quantity }</p>
                                </div>
                            </div>
                       )}
                    </div>
                </div>
            )
        ):(
            <p className={styles.no__orders}>You have no any orders</p>
        )}
        </>
    )
}