export function addQuantitySession(product: number){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cart/cart_add/${product}`);
    xhttp.send();
}

export function removeFromCartSession(product: number){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cart/cart_remove/${product}`);
    xhttp.send();
}

export function removeQuantitySession(product: number){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cart/cart_low_quantity/${product}`);
    xhttp.send();
}