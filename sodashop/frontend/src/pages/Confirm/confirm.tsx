import { useState, useEffect, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Blobs } from "../../components/global/blobs/blobs";
import { Form } from "../../components/form/form";
import { FormInput } from "../../components/form/formInput/formInput";
import styles from "./confirm.module.scss";

const Confirm:FC = () => {
    const navigate = useNavigate();

    const params = useParams();
    const token = params.token;

    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [time, setTime] = useState<number>(30);
    const [active, setActive] = useState<boolean>(true);

    const [valid, setValid] = useState<boolean>(false);
    const [validMail, setValidMail] = useState<string>("");

    useEffect(() => {
        fetch(`/user/check-confirm-email-token/${token}`)
            .then(response => response.json())
            .then(response => {
                if (response.status === "valid"){
                    setValid(true);
                }
                else{
                    setValidMail(response.message);
                }
            })
    }, []);

    function confirmEmail(){
        fetch(`/user/confirm-email/${token}/${code}`)
            .then(response => response.json())
            .then(response => {
                if (response.status === "valid"){
                    navigate("/profile");
                }
                else{
                    setError(response.message);
                }
            }
        )
    }

    function sendNewCode(){
        setActive(false);
        setTime(30);
        fetch(`/user/send-new-code/${token}`);
    }

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

    return(
        <>
        <Blobs />

        {valid ? (
            <Form>
                <p>Enter the confirmation code sent to the email</p>
                <FormInput label="code" type="number" value={code} setValue={setCode} error={error}/>
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
        )}
        </>
    )
}

export default Confirm;