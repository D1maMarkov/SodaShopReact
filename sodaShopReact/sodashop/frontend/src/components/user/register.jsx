import React, { useState, useEffect } from "react";
import { Blobs } from "../blobs/Blobs";
import { Cart } from "../cart/Cart";
import { Topnav } from "../topnav/Topnav";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import TextField from '@mui/material/TextField';


export const Register = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat;";

    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [len_cart, setLenCart] = useState(0);

    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function login(){
        setLoading(true);
        let xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                navigate("/confirm");
                console.log("success!");
            }
            else if (this.readyState == 4 && this.status == 202){
                console.log("not authorised");
                setError1("a user with this username already exists");
                setLoading(false);
            }
            else if (this.readyState == 4 && this.status == 201){
                console.log("not authorised");
                setLoading(false);
                setError2("a user with this email already exists");
            }
            else if (this.readyState == 4 && this.status == 203){
                console.log("not authorised");
                setLoading(false);
                setError2("apparently you entered an incorrect email address");
            }
        }

    
        xhttp.open("GET", "/user/RegisterUser/" + username + "/" + email + "/" + password);
        xhttp.send();
    }

    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [error3, setError3] = useState("");

    const [loading, setLoading] = useState(false);
    const [activeBut, setActiveBut] = useState(false);

    function ValidationEmail(event){
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

    const [registerBlankStyles, setStyles] = useState({});

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
        <Blobs colors={["#d97aa9", "#a0004f"]} />
        
        <div style={registerBlankStyles} className={styles.registerBlank}>
            <div className={styles.title}>
                <p onClick={() => navigate('/login') } >Login</p>
                <p onClick={() => navigate('/register')} ><b>Registration</b></p>
            </div>

            <hr width="100%!important" style={{ color: "lightgray" }} />

            <div className="login-form">     
                <TextField className={styles.loginInput} label="Username" variant="standard" value={username} onChange={event => setUser(event.target.value)}/>
                <div className={styles.errorLog} >{ error1 }</div>

                <TextField type="email" className={styles.loginInput} label="Email" value={email} variant="standard" onChange={event => ValidationEmail(event)}/>
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
