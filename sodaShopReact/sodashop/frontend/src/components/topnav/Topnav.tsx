import {FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import { useSelector } from "react-redux";
import { get_user_info } from "../../hooks/useCurrentUser";
import { RootState } from "../../state/store";
import stylesCart from "../Cart/Cart.module.scss";
import styles from "./Topnav.module.scss";


type TypeStyles = {
    general: CSSModule,
    simple: CSSModule,
}

const stylesTopnav = {
    general: styles.topnavMainPage,
    simple: styles.topnav,
}

type TypeTopnav = {
    type?: string,
    color: string,
}

export const Topnav: FC<TypeTopnav> = ({type = "general", color}) => {
    const [user, setUser] = useState<string>("");

    const navigate = useNavigate();

    const cartLenght = useSelector((state: RootState) => state.cartLenght);

    useEffect(() => get_user_info({setUserName: setUser}), []);

    if (color == "white"){
        document.body.style.setProperty("--topnav-color", "white");
    }
    else{
        document.body.style.setProperty("--topnav-color", "#2d1344");
    }

    function OpenCart(){
        $("." + stylesCart.cart).css("right", "0px");
        $("." + stylesCart.cart).css("height", "100%");
        $("." + stylesCart.cart).css("overflow", "auto");
        $("." + stylesCart.cart).css("box-shadow", "-5px 0px 20px gray");
        $("body").css("position", "sticky");
        $("body").css("overflow-y", "hidden");
    }

    return (
        <div className={stylesTopnav[type as keyof TypeStyles]}>
            <a onClick={() => navigate("/")}>Home</a>
            <a onClick={() => navigate("/catalog")}>Shop</a>

            <div style={{float: "right"}}>
                {user != null && user.length > 0 ? (
                    <>
                        <div onClick={() => navigate("/profile")} className={styles.usercircle}>
                            <span><a>{user[0]}</a></span>
                        </div>
                    </>
                ):(
                    <>
                        <img onClick={() => navigate("/login")} className={styles.topnavImg} src={"/static/frontend/img/" + color + "topnav/profile.png"}/>
                    </>
                )}

                <Badge badgeContent={cartLenght.len} color="secondary" overlap="circular">
                    <img onClick={OpenCart} className={styles.topnavImg} src={"/static/frontend/img/" + color + "topnav/basket.png"}/>
                </Badge>
            </div>
        </div>
    )
}