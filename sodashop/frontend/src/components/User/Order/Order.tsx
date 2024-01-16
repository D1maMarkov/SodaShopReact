import { FC, useState, useEffect } from "react";
import { TypeCartProduct } from "../../types";
import styles from "./Order.module.scss";


enum OrderState {
    pickUp = "At the pick-up point",
    warehouse = "In the warehouse",
}

type TypeOrder = {
    date: string,
    id: number,
    price: number,
    products: TypeCartProduct[],
    state: OrderState,
}

export const Orders: FC = () => {
    const [orders, setOrders] = useState<TypeOrder[]>([]);

    function getOrders(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setOrders(xhttp.response);
            }
        }
    
        xhttp.open("GET", "/get-orders");
        xhttp.send();
    }

    useEffect(getOrders, []);

    return (
        <>
        <p style={{ color: "rgb(250, 210, 210)" }}>Orders</p>
        {orders.length > 0 ? (
            orders.map((order: TypeOrder, ind: number) =>
                <div className={styles.order__products}>
                    <div className={styles.order__date}>                     
                        <p>{ order.date }</p>                      
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
                                <img src={ product.image } />
                                <div className={styles.order__product__description}>
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