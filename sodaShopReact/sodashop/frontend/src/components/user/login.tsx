import { useState } from "react";
import { Blobs } from "../Blobs/Blobs";
import { Cart } from "../Cart/Cart";
import { Topnav } from "../Topnav/Topnav";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import TextField from '@mui/material/TextField';
import { TypeCartProduct } from "../types";


export const Login = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";
    document.body.style.height = "100vh";

    const navigate = useNavigate();

    const [cart, setCart] = useState<TypeCartProduct[]>([]);
    const [len_cart, setLenCart] = useState<number>(0);

    const [username, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [reset, setReset] = useState<string>("");

    function login(){
        let xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                navigate("/profile");
            }
            else if (this.readyState == 4 && this.status == 202){
                setError("the username or password is incorrect");
            }
        }
       
        let params = `username=${username}&password=${password}`;
      
        xhttp.open("POST", "/user/LoginUser", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(params);
    }

    function Reset(){
        setError("");
        setReset("");
        let xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setReset("we have sent you an email to recover your password");
            }
            else if (this.readyState == 4 && this.status == 202){
                setError("Incorrect username");
            }
            else if (this.readyState == 4 && this.status == 201){
                setReset("you have already received an email to reset your password");
            }
        }
       
        xhttp.open("GET", `/user/GetResetToken/${username}`);
        xhttp.send();
    }

    return (
        <>
        <Topnav len_cart={len_cart} type={"mainPage"} color={"white"} />
        <Cart cart={cart} setCart={setCart} setLenCart={setLenCart} />
        <Blobs />

        <div className={styles.registerBlank}>
            <div className={styles.title}>
                <p onClick={() => navigate('/login') } ><b>Login</b></p>
                <p onClick={() => navigate('/register')} >Registration</p>
            </div>

            <hr />
               
            <TextField className={styles.loginInput} label="Username" variant="standard" value={username} onChange={event => setUser(event.target.value)}/>
            <div className={styles.errorLog} >{ error }</div>
            <TextField className={styles.loginInput} label="Password" variant="standard" value={password} onChange={event => setPassword(event.target.value)}/>
            <a href="#" onClick={Reset} style={{ float: 'left', marginLeft: "10%" }}  >Forgotten password?</a><br /><br />
            <div className={styles.resetMail}>{ reset }</div>
            <button onClick={login}>Login</button>
        </div>
        </>
    )
}
