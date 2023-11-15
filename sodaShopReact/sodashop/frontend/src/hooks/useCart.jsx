export const getCart = (setCart) => {

    let xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            setCart(xhttp.response);
        }
    }

    xhttp.open("GET", "/cart/get_cart");
    xhttp.send();
}

