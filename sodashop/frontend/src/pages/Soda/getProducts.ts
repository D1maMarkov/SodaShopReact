import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TypeProduct } from "../../components/types";


export const getProducts = () => {
    const params = useParams();
    const [products, setProducts] = useState<TypeProduct[]>([]);

    useEffect(() => {
        fetch(`/get-product/${params.category}/${params.color}`)
            .then(response => response.json())
            .then(products => setProducts(products));
    }, []);

    return products;
}