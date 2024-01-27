import {useEffect, useState} from "react";

export function getPopularProduct(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/get-popular-products")
            .then(response => response.json())
            .then(products => setProducts(products));
    }, []);

    return products
}