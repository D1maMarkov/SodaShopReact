import { useState, useEffect, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Blobs } from "../../components/Blobs/Blobs";
import { Form } from "../../components/User/Form/form";
import { FormInput } from "../../components/User/FormInput/formInput";
import styles from "./confirm.module.scss";


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
            if (this.readyState == 4){
                if (this.status == 200){
                    setEmail(xhttp.response);
                    setValid(true);
                }
                else if (this.status == 202){
                    setValidMail("Incorrect url adress");
                }
                else if (this.status == 201){
                    setValidMail("You take too long to confirm the email. Try to register again")
                }
            }
        }
       
        xhttp.open("GET", `/user/check-confirm-email-token/${token}`);
        xhttp.send();
    }

    function confirmEmail(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState){
                if (this.status == 200){
                    navigate("/profile");
                }
                else if (this.status == 202){
                    setError("incorrect code");
                }
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

    const handleChange = (value: string) => {
        const result = value.replace(/\D/g, '');
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
            <Form>
                <p>Enter the confirmation code sent to the email</p>
                <FormInput label="code" value={code} setValue={handleChange} error={error}/>
                <button onClick={confirmEmail} >Confirm</button>
                <br />
                <div className={styles.timer__wrapper}>
                    {time > 0 ? (
                       <a className={styles.time__less}>{ time }</a>
                    ):(<></>)
                    }

                    {active ? (
                        <a href="#" className={styles.timer} onClick={sendNewCode} >send the code again</a>
                    ):(
                        <a className={styles.timer}>send the code again</a>
                    )}
                </div>
            </Form>
        ):(
            <h1>{ validMail }</h1>
        )
        }
        </>
    )
}