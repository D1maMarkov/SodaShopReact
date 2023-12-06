import { FC, useState, useEffect } from "react";
import Alert from "../Alert";
import { TypeProduct } from "../types";
import { useDispatch } from "react-redux";
import { add_quantity } from "../../state/cart/cartSlice";
import { addQuantitySession } from "../../hooks/useCart";
import { get_user_info } from "../../hooks/useCurrentUser";


type TypeButton = {
    product: TypeProduct
}

export const MyButton: FC<TypeButton> = ({product}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);
    const [openWarning, setOpenWarning] = useState<boolean>(false);

    const [user, setUser] = useState<string | null>(null);

    const dispatch = useDispatch();

    const handleCloseError = () => {
        setOpenError(false);
    };

    const handleCloseWarning = () => {
        setOpenWarning(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function addToCart(){
        if (user == null){
            setOpenWarning(true);
        }
        else{
            setOpen(true);
            dispatch(add_quantity(product)); 
            addQuantitySession(product.id);
        }
    }

    useEffect(() => get_user_info({setUserName: setUser}), []);

    return (
        <>
        <div onClick={addToCart} className="container4cartbutton">
            <input className="cartbutton" type="submit" value="Add to cart" />
        </div>

        <Alert severity={"success"} handleClose={handleClose} open={open} text={"Product added to cart!"} />
        <Alert severity={"error"} handleClose={handleCloseError} open={openError} text={"Something went wrong!"} />
        <Alert severity={"warning"} handleClose={handleCloseWarning} open={openWarning} text={"Before adding an item to the cart, log in to your account"} />
        </>
    )
}