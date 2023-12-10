import { ChangeEvent, useState, useEffect, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Blobs } from "../Blobs/Blobs";
import styles from "./login.module.scss";
import TextField from '@mui/material/TextField';


export const Confirm:FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    const navigate = useNavigate();

    const params = useParams();
    const token = params.token;

    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [time, setTime] = useState<number>(30);
    const [active, setActive] = useState<boolean>(true);

    const [valid, setValid] = useState<boolean>(false);
    const [validMail, setValidMail] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    function checkValidToken(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setEmail(xhttp.response);
                setValid(true);
            }
            else if (this.readyState == 4 && this.status == 202){
                setValidMail("Incorrect url adress");
            }
            else if (this.readyState == 4 && this.status == 201){
                setValidMail("You take too long to confirm the email. Try to register again")
            }
        }
       
        xhttp.open("GET", `/user/check-confirm-email-token/${token}`);
        xhttp.send();
    }

    function confirmEmail(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                navigate("/profile");
            }
            else if (this.readyState == 4 && this.status == 202){
                setError("incorrect code");
            }
        }
       
        xhttp.open("GET", `/user/confirm-email/${token}/${code}`);
        xhttp.send();
    }

    function sendNewCode(){
        let xhttp = new XMLHttpRequest();
        setActive(false);
        setTime(30);
        xhttp.open("GET", `/user/send-new-code/${token}`);
        xhttp.send();
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = event.target.value.replace(/\D/g, '');
        setCode(result);
    };

    useEffect(() => {
        setTimeout(() => {
        if (time > 0){
            setTime(time - 1);
            setActive(false);
        }
        else{
            setActive(true);
        }
        }, 1000)
    }, [time]);

    useEffect(checkValidToken, []);

    return(
        <>
        <Blobs />

        {valid ? (
            <div style={{ paddingBottom: "40px" }} className={styles.register__blank} >
                <p>Enter the confirmation code sent to the email</p>
                <TextField style={{ width: "70%" }} className={styles.login__input} label="Code" variant="standard" value={code} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}/><br />
                <div style={{ marginLeft: "15%" }} className={ styles.error__log }>{ error }</div>
                <button style={{ padding: "15px 5px", width: "70%", marginTop: "0px" }} onClick={confirmEmail} >Confirm</button>
                <br />
                <div style={{ display: "flex" }}>
                    {time > 0 ? (
                       <a style={{ display: "block", position: "absolute", bottom: "20px", right: "190px" }}>{ time }</a>
                    ):(<></>)
                    }

                    {active ? (
                        <a href="#" className={styles.timer} onClick={sendNewCode} >send the code again</a>
                    ):(
                        <a className={styles.timer}>send the code again</a>
                    )}
                </div>
            </div>
        ):(
            <h1 style={{textAlign: "center", width: "100%", marginLeft: "0px", fontSize: "45px", color: "white"}} >{ validMail }</h1>
        )
        }
        </>
    )
}

/*
text-align: center;
    width: 100%;
    margin-left: 0px;
    font-size: 45px;
    */