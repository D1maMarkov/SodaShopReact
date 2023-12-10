import { ChangeEvent, useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Blobs } from "../Blobs/Blobs";
import styles from "./login.module.scss";
import TextField from '@mui/material/TextField';


export const Confirm:FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [time, setTime] = useState<number>(30);
    const [active, setActive] = useState<boolean>(true);

    const navigate = useNavigate();

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
       
        xhttp.open("GET", "/user/confirm-email/" + code);
        xhttp.send();
    }

    function sendNewCode(){
        let xhttp = new XMLHttpRequest();
        setActive(false);
        xhttp.open("GET", "/user/send-new-code");
        xhttp.send();
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = event.target.value.replace(/\D/g, '');
        setCode(result);
    };

    useEffect(() => {
        setTimeout(() => {
        if (time == 0){
            setTime(30);
            setActive(true);
        }
        else{
            setTime(time - 1);
        }
        }, 1000)
    }, [time]);

    return(
        <>
        <Blobs />

        <div style={{ paddingBottom: "40px" }} className={styles.register__blank} >
            <p>Enter the confirmation code sent to the email</p>
            <TextField style={{ width: "70%" }} className={styles.login__input} label="Code" variant="standard" value={code} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}/><br />
            <div style={{ marginLeft: "15%" }} className={ styles.error__log }>{ error }</div>
            <button style={{ padding: "15px 5px", width: "70%", marginTop: "0px" }} onClick={confirmEmail} >Confirm</button>
            <br />
            <div style={{ display: "flex" }}>
                <a style={{ display: "block", position: "absolute", bottom: "20px", right: "190px" }}>{ time }</a>
                {active ? (
                    <a href="#" className={styles.timer} onClick={sendNewCode} >send the code again</a>
                ):(
                    <a className={styles.timer}>send the code again</a>
                )}
            </div>
        </div>
        </>
    )
}