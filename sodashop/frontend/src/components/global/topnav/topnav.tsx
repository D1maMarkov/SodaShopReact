import {FC, useState, useEffect, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../hooks/useCurrentUser";
import { RootState } from "../../../state/store";
import styles from "./topnav.module.scss";
import { Cart } from "./cart/cart";


type TypeStyles = {
    general: CSSModule,
    simple: CSSModule,
}

const stylesTopnav = {
    general: styles.topnav__mainpage,
    simple: styles.topnav,
}

type TypeTopnav = {
    type?: string,
    color?: string,
}

export const Topnav: FC<TypeTopnav> = ({type="general", color="white"}) => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState<string>("");
    const cartLenght = useSelector((state: RootState) => state.cartLenght);
    const [openCart, setOpenCart] = useState<boolean>(false);

    document.body.style.setProperty("--topnav-color", color == "white" ? "white" : "#2d1344");
    
    useEffect(() => getUserInfo({setUserName: setUser}), []);

    useEffect(() => {
        document.body.style.overflowY = openCart ? "hidden": "auto";
    }, [openCart])

    return (
        <>
        <nav className={stylesTopnav[type as keyof TypeStyles]}>
            <div>
                <a onClick={() => navigate("/")}>Home</a>
                <a onClick={() => navigate("/catalog")}>Shop</a>
            </div>

            <div>
                {user.length > 0 ? (
                    <div onClick={() => navigate("/profile")} className={styles.user__circle}>
                        <span><a>{user[0]}</a></span>
                    </div>
                ):(
                    <img onClick={() => navigate("/login")} className={styles.topnav__img} src={"/static/frontend/img/" + color + "topnav/profile.png"}/>
                )}

                <Badge badgeContent={cartLenght.len} color="secondary" overlap="circular">
                    <img onClick={() => setOpenCart(true)} className={styles.topnav__img} src={"/static/frontend/img/" + color + "topnav/basket.png"}/>
                </Badge>
            </div>
        </nav>

        <Cart opened={openCart} setOpen={setOpenCart}/>
        </>
    )
}