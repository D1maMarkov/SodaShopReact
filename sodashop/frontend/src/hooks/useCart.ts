export function addQuantitySession(product: number){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cart/add/${product}`);
    xhttp.send();
}

export function removeFromCartSession(product: number){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cart/remove/${product}`);
    xhttp.send();
}

export function removeQuantitySession(product: number){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cart/low-quantity/${product}`);
    xhttp.send();
}