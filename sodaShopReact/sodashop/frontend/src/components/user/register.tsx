import { useState, useEffect, ChangeEvent, FC } from "react";
import { Blobs } from "../Blobs/Blobs";
import { Cart } from "../Cart/Cart";
import { Topnav } from "../Topnav/Topnav";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import TextField from '@mui/material/TextField';
import { validationEmail } from "../../hooks/validations";


export const Register:FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    const navigate = useNavigate();

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
        if (error2.length == 0){
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

            let params = `username=${username}&password=${password}&email=${email}`;
        
            xhttp.open("POST", "/user/register-user", true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(params);
        }
    }

    function handleEmail(email: string){
        setEmail(email);

        if (validationEmail(email)){
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
        <Topnav color={"white"} />
        <Cart />
        <Blobs />
        
        <div style={registerBlankStyles} className={styles.register__blank}>
            <div className={styles.title}>
                <p onClick={() => navigate('/login') } >Login</p>
                <p onClick={() => navigate('/register')} ><b>Registration</b></p>
            </div>

            <hr />

            <div>     
                <TextField className={styles.login__input} label="Username" variant="standard" value={username} onChange={event => setUser(event.target.value)}/>
                <div className={styles.error__log} >{ error1 }</div>

                <TextField type="email" className={styles.login__input} label="Email" value={email} variant="standard" onChange={event => handleEmail(event.target.value)}/>
                <div className={styles.error__log} >{ error2 }</div>

                <TextField className={styles.login__input} label="Password" variant="standard" value={password} onChange={event => setPassword(event.target.value)}/>
                <div className={styles.error__log} >{ error3 }</div>

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
