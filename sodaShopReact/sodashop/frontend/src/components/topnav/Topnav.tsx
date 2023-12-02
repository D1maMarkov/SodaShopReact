import React, {FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import stylesCommon from "./Topnav.module.scss";
import stylesBlack from "./TopnavBlack.module.scss";
import stylesWhite from "./TopnavWhite.module.scss";
import stylesMainPage from "./TopnavMainPage.module.scss";
import stylesCart from "../Cart/Cart.module.scss";
import { get_user_info } from "../../hooks/useCurrentUser";


type TypeStyles = {
    black: CSSModule,
    white: CSSModule,
    mainPage: CSSModule
}

const styles: TypeStyles = {
    black: stylesBlack,
    white: stylesWhite,
    mainPage: stylesMainPage
}

type TypeTopnav = {
    type: string,
    color: string,
    len_cart: number,
    setOpenCart?: Dispatch<SetStateAction<boolean>>
}

export const Topnav: FC<TypeTopnav> = ({type, color, len_cart, setOpenCart}) => {
    const [user, setUser] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => get_user_info({setUserName: setUser}), []);

    function OpenCart(){
        $("." + stylesCart.cart).css("right", "0px");
        $("." + stylesCart.cart).css("height", "100%");
        $("." + stylesCart.cart).css("overflow", "auto");
        $("." + stylesCart.cart).css("box-shadow", "-5px 0px 20px gray");
        $("body").css("position", "sticky");
        $("body").css("overflow-y", "hidden");
        $("body").css("width", "100vw");
        if (setOpenCart){
            setOpenCart(true);
        }
    }

    return (
        <div className={styles[type as keyof TypeStyles].topnav}>
            <a className={styles[type as keyof TypeStyles].topnavA} onClick={() => navigate("/")}>Home</a>
            <a className={styles[type as keyof TypeStyles].topnavA} onClick={() => navigate("/catalog")}>Shop</a>

            <div style={{float: "right"}}>
                {user != null && user.length > 0 ? (
                    <>
                        <div onClick={() => navigate("/profile")} className={stylesCommon.usercircle}>
                            <a className={stylesCommon.usercircleA} >{user[0]}</a>
                        </div>
                    </>
                ):(
                    <>
                        <img onClick={() => navigate("/login")} className={stylesCommon.topnavImg} src={"/static/frontend/img/" + color + "topnav/profile.png"}/>
                    </>
                )}

                <Badge badgeContent={len_cart} color="secondary" overlap="circular">
                    <img onClick={OpenCart} className={stylesCommon.topnavImg} src={"/static/frontend/img/" + color + "topnav/basket.png"}/>
                </Badge>
            </div>
        </div>
    )
}