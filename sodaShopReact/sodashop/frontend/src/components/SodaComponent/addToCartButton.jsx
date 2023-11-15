import React, { useState } from "react";
import Alert from "../Alert";


export const MyButton = ({cart, setCart, product}) => {
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);


    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenError(false);
    };

    const handleCloseWarning = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenWarning(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };


    function add_quantity(){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setOpen(true);

                let added = false;
                for (let i = 0; i < cart.length; i++){
                    console.log(cart[i].product, product);
                    if (cart[i].product.id == product.id){
                        cart[i].quantity++;
                        added = true;
                    }
                }

                if (!added){
                    setCart([...cart, { quantity: 1, price: 1, product: product }]);
                }  
                else{
                    setCart([...cart]);
                }
            }
            else if (this.readyState == 4 && this.status == 202){
                setOpenWarning(true);
            }
        
            else if (this.readyState == 4 && this.status != 202 && this.status != 200){
                setOpenError(true);
            }
        }
    
        xhttp.open("GET", "/cart/cart_add/" + product.id + "/");
        xhttp.send();
    }

    return (
        <>
        <div id="container_with_product_name" onClick={add_quantity} className="container4cartbutton">
            <input class="cartbutton" type="submit" value="Add to cart" />
        </div>

        <Alert severity="success" handleClose={handleClose} open={open} text={"Product added to cart!"} />
        <Alert severity="error" handleClose={handleCloseError} open={openError} text={"Something went wrong!"} />
        <Alert severity="warning" handleClose={handleCloseWarning} open={openWarning} text={"Before adding an item to the cart, log in to your account"} />
        </>
    )
}