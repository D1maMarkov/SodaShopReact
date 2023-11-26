import React, { useState, useEffect, ChangeEvent } from "react";
import { Blobs } from "../blobs/Blobs";
import { Cart } from "../cart/Cart";
import { Topnav } from "../topnav/Topnav";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import TextField from '@mui/material/TextField';
import { TypeCartProduct } from "../types";


export const Register = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat;";
    document.body.style.height = "100vh";

    const navigate = useNavigate();
    const [cart, setCart] = useState<TypeCartProduct[]>([]);
    const [len_cart, setLenCart] = useState<number>(0);

    const [username, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [error1, setError1] = useState<string>("");
    const [error2, setError2] = useState<string>("");
    const [error3, setError3] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [activeBut, setActiveBut] = useState<boolean>(false);
    const [registerBlankStyles, setStyles] = useState({});

    function login(){
        setLoading(true);
        let xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                navigate("/confirm");
            }
            else if (this.readyState == 4 && this.status == 202){
                setError1("a user with this username already exists");
                setLoading(false);
            }
            else if (this.readyState == 4 && this.status == 201){
                setLoading(false);
                setError2("a user with this email already exists");
            }
            else if (this.readyState == 4 && this.status == 203){
                setLoading(false);
                setError2("apparently you entered an incorrect email address");
            }
        }

    
        xhttp.open("GET", "/user/RegisterUser/" + username + "/" + email + "/" + password);
        xhttp.send();
    }


    function ValidationEmail(event: ChangeEvent<HTMLInputElement>){
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmail(event.target.value);
        if (re.test(event.target.value) ) {
            setError2("");
        }
        else{
            setError2("invalid email address");
        }
    }

    useEffect(() =>{
        if (email.length > 0 && password.length > 0 && username.length > 0 && error2.length == 0 ){
            setActiveBut(true);
        }
        else{
            setActiveBut(false);
        }
    }, [email, username, password]);

    useEffect(() => {
        if (loading){
            setStyles({ opacity: ".7", pointerEvents: "none"});
        }
        else{
            setStyles({});
        }
    }, [loading]);

    return (
        <>
        <Topnav len_cart={len_cart} type={"mainPage"} color={"white"} />
        <Cart cart={cart} setCart={setCart} setLenCart={setLenCart} />
        <Blobs />
        
        <div style={registerBlankStyles} className={styles.registerBlank}>
            <div className={styles.title}>
                <p onClick={() => navigate('/login') } >Login</p>
                <p onClick={() => navigate('/register')} ><b>Registration</b></p>
            </div>

            <hr style={{ color: "lightgray", width: "100%!important" }} />

            <div className="login-form">     
                <TextField className={styles.loginInput} label="Username" variant="standard" value={username} onChange={event => setUser(event.target.value)}/>
                <div className={styles.errorLog} >{ error1 }</div>

                <TextField type="email" className={styles.loginInput} label="Email" value={email} variant="standard" onChange={(event: ChangeEvent<HTMLInputElement>) => ValidationEmail(event)}/>
                <div className={styles.errorLog} >{ error2 }</div>

                <TextField className={styles.loginInput} label="Password" variant="standard" value={password} onChange={event => setPassword(event.target.value)}/>
                <div className={styles.errorLog} >{ error3 }</div>

                {activeBut ? (
                    <button onClick={login} style={{marginRight: '10px'}}>Sign in</button>
                ):(
                    <button disabled style={{marginRight: '10px'}}>Sign in</button>
                )}
                
            </div>
        </div>
        </>
    )
}
