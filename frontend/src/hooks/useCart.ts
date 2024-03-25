export function addQuantitySession(product: number){
    fetch(`/cart/add/${product}`);
}

export function removeFromCartSession(product: number){
    fetch(`/cart/remove/${product}`);
}

export function removeQuantitySession(product: number){
    fetch(`/cart/low-quantity/${product}`);
}
