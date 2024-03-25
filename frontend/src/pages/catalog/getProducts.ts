import { useState, useEffect } from "react";
import { TypeProduct } from "../../components/types";


function shuffleArray(array : TypeProduct[]) {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getProducts(){
    const [products, setProducts] = useState<TypeProduct[]>([]);

    useEffect(() => {
        fetch("/get-products")
            .then(response => response.json())
            .then(response => {
                setProducts(shuffleArray(response));
        })
    }, []);

    return products;
}
