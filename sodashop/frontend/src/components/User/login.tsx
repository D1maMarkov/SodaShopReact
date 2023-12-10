import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { validationEmail } from "../../hooks/validations";
import { Topnav } from "../Topnav/Topnav";
import { Cart } from "../Cart/Cart";
import { Blobs } from "../Blobs/Blobs";
import styles from "./login.module.scss";


export const Login:FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    const navigate = useNavigate();

    const [username, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    
    const [reset, setReset] = useState<boolean>(false);
    const [resetText, setResetText] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

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
      
        xhttp.open("POST", "/user/login-user", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(params);
    }

    function Reset(){
        if (validationEmail(email)){
            setLoading(true);
            setResetText("");
            let xhttp = new XMLHttpRequest();
        
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4){
                    setLoading(false);
                    switch(this.status){
                        case 200:
                            setResetText("we have sent you an email to recover your password");
                            break;
                        case 202:
                            setResetText("There is no user with such an email");
                            break;
                        case 201:
                            setResetText("you have already received an email to reset your password");
                            break;
                    }
                }
            }
        
            xhttp.open("GET", `/user/get-reset-token/${email}`);
            xhttp.send();
        }
    }

    useEffect(() => {
        const fields = document.getElementsByClassName(styles.register__blank)[0] as HTMLElement;
        loading ? fields.classList.add(styles.loading) : fields.classList.remove(styles.loading);
    }, [loading]);

    useEffect(() => {
        !validationEmail(email) ? setEmailError("Write correct email") : setEmailError("");
    }, [email]);

    return (
        <>
        <Topnav color={"white"} />
        <Cart />
        <Blobs />

        <div className={styles.register__blank}>
            <div className={styles.title}>
                <p onClick={() => navigate('/login') } ><b>Login</b></p>
                <p onClick={() => navigate('/register')} >Registration</p>
            </div>

            <hr />
               
            {reset ? (
                <>
                    <TextField className={styles.login__input} label="email" variant="standard" value={email} onChange={event => setEmail(event.target.value)}/>
                    <div className={styles.error__log}>{ emailError }</div>
                    <div className={styles.reset__mail}>{ resetText }</div>
                    <button onClick={Reset}>Send mail to reset password</button>
                </>
            ):(
                <>
                    <TextField className={styles.login__input} label="Username" variant="standard" value={username} onChange={event => setUser(event.target.value)}/>
                    <div className={styles.error__log} >{ error }</div>
                    <TextField type={"password"} className={styles.login__input} label="Password" variant="standard" value={password} onChange={event => setPassword(event.target.value)}/>
                    <a href="#" onClick={() => setReset(true)} style={{ float: 'left', marginLeft: "10%" }}  >Forgotten password?</a><br /><br />
                    <button onClick={login}>Login</button>
                </>
            )}
        </div>
        </>
    )
}
