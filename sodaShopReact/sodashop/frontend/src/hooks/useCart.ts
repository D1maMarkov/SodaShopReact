export function addQuantitySession(product: number){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cart/cart-add/${product}`);
    xhttp.send();
}

export function removeFromCartSession(product: number){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cart/cart-remove/${product}`);
    xhttp.send();
}

export function removeQuantitySession(product: number){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cart/cart-low-quantity/${product}`);
    xhttp.send();
}