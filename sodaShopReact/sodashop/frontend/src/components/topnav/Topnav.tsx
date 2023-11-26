import React, {FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import stylesCommon from "./Topnav.module.scss";
import stylesBlack from "./TopnavBlack.module.scss";
import stylesWhite from "./TopnavWhite.module.scss";
import stylesMainPage from "./TopnavMainPage.module.scss";
import stylesCart from "../cart/Cart.module.scss";


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
    const [user, setCurrentUser] = useState<string | null>(null);

    const navigate = useNavigate();

    function get_user(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setCurrentUser(xhttp.response);
            }
            else if (this.readyState == 4 && this.status == 202){
                setCurrentUser(null);
            }
        }
    
        xhttp.open("GET", "/user/get_current_user");
        xhttp.send();
    }

    useEffect(get_user, []);

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
                {user != null ? (
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