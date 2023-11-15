import React, { useState } from "react";
import { Blobs } from "../blobs/Blobs";
import { Cart } from "../cart/Cart";
import { Topnav } from "../topnav/Topnav";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import TextField from '@mui/material/TextField';


export const Login = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";
    document.body.style.height = "100vh";

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [len_cart, setLenCart] = useState(0);

    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");

    function login(){
        let xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                navigate("/profile");
            }
            else if (this.readyState == 4 && this.status == 202){
                console.log("not authorised");
                setError("the username or password is incorrect");
            }
        }
    
        xhttp.open("GET", "/user/LoginUser/" + username + "/" + password);
        xhttp.send();
    }

    const [error, setError] = useState("");

    return (
        <>
        <Topnav len_cart={len_cart} type={"mainPage"} color={"white"} />
        <Cart cart={cart} setCart={setCart} setLenCart={setLenCart} />
        <Blobs colors={["#d97aa9", "#a0004f"]} />

        <div className={styles.registerBlank}>
            <div className={styles.title}>
                <p onClick={() => navigate('/login') } ><b>Login</b></p>
                <p onClick={() => navigate('/register')} >Registration</p>
            </div>

            <hr />
               
            <TextField className={styles.loginInput} label="Username" variant="standard" value={username} onChange={event => setUser(event.target.value)}/>
            <div className={styles.errorLog} >{ error }</div>
            <TextField className={styles.loginInput} label="Password" variant="standard" value={password} onChange={event => setPassword(event.target.value)}/>
            <button onClick={login} style={{marginRight: '10px'}}>Login</button>
        </div>
        </>
    )
}
