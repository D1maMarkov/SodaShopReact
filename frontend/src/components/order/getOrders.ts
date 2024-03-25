import { useState, useEffect } from "react";
import { TypeOrder } from "../types";


export function getOrders(){
    const [orders, setOrders] = useState<TypeOrder[]>([]);

    useEffect(() => {
        fetch("/cart/get-orders")
            .then(response => response.json())
            .then(response => {

                setOrders(response);
        })
    }, []);

    return orders;
}
