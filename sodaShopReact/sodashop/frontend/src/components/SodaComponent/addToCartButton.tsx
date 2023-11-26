import React, { FC, useState, ChangeEvent, Dispatch } from "react";
import Alert from "../Alert";
import { TypeCartProduct, TypeProduct } from "../types";



type TypeButton = {
    cart: TypeCartProduct[],
    setCart: Dispatch<TypeCartProduct[]>,
    product: TypeProduct
}

export const MyButton : FC<TypeButton> = ({cart, setCart, product}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);
    const [openWarning, setOpenWarning] = useState<boolean>(false);


    const handleCloseError = () => {
        setOpenError(false);
    };

    const handleCloseWarning = () => {
        setOpenWarning(false);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function add_quantity(){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setOpen(true);

                let added = false;
                for (let i = 0; i < cart.length; i++){
                    if (cart[i].product.id == product.id){
                        cart[i].quantity++;
                        added = true;
                    }
                }

                if (!added){
                    let currProduct:TypeCartProduct = {
                        quantity: 1, 
                        price: 1, 
                        id: product.id,
                        product: product
                    }
                    setCart([...cart, currProduct]);
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
        <div onClick={add_quantity} className="container4cartbutton">
            <input className="cartbutton" type="submit" value="Add to cart" />
        </div>

        <Alert severity={"success"} handleClose={handleClose} open={open} text={"Product added to cart!"} />
        <Alert severity={"error"} handleClose={handleCloseError} open={openError} text={"Something went wrong!"} />
        <Alert severity={"warning"} handleClose={handleCloseWarning} open={openWarning} text={"Before adding an item to the cart, log in to your account"} />
        </>
    )
}