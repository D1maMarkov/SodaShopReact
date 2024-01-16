import { FC, useState, useEffect } from "react";
import Alert from "../Alert";
import { TypeProduct } from "../types";
import { useDispatch } from "react-redux";
import { addQuantity } from "../../state/cart/cartSlice";
import { addQuantitySession } from "../../hooks/useCart";
import { getUserInfo } from "../../hooks/useCurrentUser";
import styles from "./addToCartButton.module.scss";


type TypeButton = {
    product: TypeProduct
}

export const MyButton: FC<TypeButton> = ({product}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);
    const [openWarning, setOpenWarning] = useState<boolean>(false);

    const [user, setUser] = useState<string | null>(null);

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        setOpenError(false);
        setOpenWarning(false);
    };

    function addToCart(){
        if (user == null){
            setOpenWarning(true);
        }
        else{
            setOpen(true);
            dispatch(addQuantity(product)); 
            addQuantitySession(product.id);
        }
    }

    useEffect(() => getUserInfo({setUserName: setUser}), []);

    return (
        <>
        <div onClick={addToCart} className={styles.container__cartbutton}>
            <input type="submit" value="Add to cart" />
        </div>

        <Alert severity={"success"} handleClose={handleClose} open={open} text={"Product added to cart!"} />
        <Alert severity={"error"} handleClose={handleClose} open={openError} text={"Something went wrong!"} />
        <Alert severity={"warning"} handleClose={handleClose} open={openWarning} text={"Before adding an item to the cart, log in to your account"} />
        </>
    )
}