import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import stylesCommon from "./Topnav.module.css";
import stylesBlack from "./TopnavBlack.module.css";
import stylesWhite from "./TopnavWhite.module.css";
import stylesMainPage from "./TopnavMainPage.module.css";


const styles = {
    "black": stylesBlack,
    "white": stylesWhite,
    "mainPage": stylesMainPage
}

export const Topnav = ({type, color, len_cart, setOpenCart}) => {
    const [user, setCurrentUser] = useState(null);

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
        $(".cart").css("right", "0px");
        $(".cart").css("height", "100%");
        $(".cart").css("overflow", "auto");
        $(".cart").css("box-shadow", "-5px 0px 20px gray");
        $("body").css("position", "sticky");
        $("body").css("overflow-y", "hidden");
        $("body").css("width", "100vw");
        $(".darkbg").css("width", "100%");
        setOpenCart(true);
    }

    return (
        <div className={styles[type].topnav}>
            <a className={styles[type].topnavA} onClick={() => navigate("/")}>Home</a>
            <a className={styles[type].topnavA} onClick={() => navigate("/catalog")}>Shop</a>

            <div style={{float: "right"}}>
                {user != null ? (
                    <>
                        <div onClick={() => navigate("/profile")} className={stylesCommon.usercircle}>
                            <a className={stylesCommon.usercircleA} >{user[0]}</a>
                        </div>
                    </>
                ):(
                    <>
                        <img id="profile" onClick={() => navigate("/login")} className={stylesCommon.topnavImg} src={"/static/frontend/img/" + color + "topnav/profile.png"}/>
                    </>
                )}

                <Badge badgeContent={len_cart} color="secondary" overlap="circular">
                    <img onClick={OpenCart} id="basket" className={stylesCommon.topnavImg} src={"/static/frontend/img/" + color + "topnav/basket.png"}/>
                </Badge>
            </div>
        </div>
    )
}