import React, { useState, useEffect, FC } from "react";
import { Blobs } from "../Blobs/Blobs";
import { Cart } from "../Cart/Cart";
import { Topnav } from "../Topnav/Topnav";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./login.module.scss";
import TextField from '@mui/material/TextField';
import { TypeCartProduct } from "../types";
import Alert from "../Alert";


export const ResetPassword:FC = () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";
    document.body.style.height = "100vh";

    const navigate = useNavigate();
    const params = useParams();

    const token: string | undefined = params.token;

    const [username, setUsername] = useState<string>("");

    const [cart, setCart] = useState<TypeCartProduct[]>([]);
    const [len_cart, setLenCart] = useState<number>(0);

    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [validLink, setLink] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    function resetPassword(){
        if (password1 != password2){
            setError("the entered passwords do not match");
        }
        else{
            setLoading(true);
            let xhttp = new XMLHttpRequest();
      
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    setOpen(true);
                    setTimeout(() => navigate("/profile"), 1500);
                }
            }
        
            let params = `username=${username}&password=${password1}`;
        
            xhttp.open("POST", "/user/ResetPassword", true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(params);
        }
    }

    function CheckToken(){
        let xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setUsername(xhttp.response);
                console.log(xhttp.response);
            }
            else if (this.readyState == 4 && this.status == 202){
                setLink(false);
                setMessage("the password reset link is invalid");
            }
            else if (this.readyState == 4 && this.status == 201){
                setLink(false);
                setMessage("The link has expired for 1 hour. Try to request password recovery again");
            }
        }
       
        let params = `token=${token}`;
      
        xhttp.open("POST", "/user/CheckToken", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(params);
    }

    useEffect(CheckToken, []);

    useEffect(() => {
        const fields = document.getElementsByClassName(styles.registerBlank)[0] as HTMLElement | null;
        if (fields){
            if (loading){
                fields.classList.add(styles.loading);
            }
            else{
                fields.classList.remove(styles.loading);
            }
        }
    }, [loading]);

    return (
        <>
        <Topnav len_cart={len_cart} type={"mainPage"} color={"white"} />
        <Cart cart={cart} setCart={setCart} setLenCart={setLenCart} />
        <Blobs />

        <Alert severity={"success"} handleClose={handleClose} open={open} text={"The password has been saved successfully!"} />

        {validLink ? (
            <div className={styles.registerBlank}>
                <TextField className={styles.loginInput} label="Password" variant="standard" value={password1} onChange={event => setPassword1(event.target.value)}/>
                <TextField className={styles.loginInput} label="Repeat password" variant="standard" value={password2} onChange={event => setPassword2(event.target.value)}/>
                <div className={styles.errorLog} >{ error }</div>
                <button onClick={resetPassword} style={{marginRight: '10px'}}>Confirm</button>
            </div>
            ):(
                <h1 className={styles.invalidLink} >{ message }</h1>
            )
        }
        </>
    )
}
