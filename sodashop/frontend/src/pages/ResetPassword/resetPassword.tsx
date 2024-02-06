import { useState, useEffect, FC } from "react";
import { Blobs } from "../../components/global/blobs/blobs";
import { Topnav } from "../../components/global/topnav/topnav";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form/form";
import { FormInput } from "../../components/form/formInput/formInput";
import Alert from "../../components/Alert";
import styles from "./resetPassword.module.scss";
import { resetPassword } from "../login/reset";


const ResetPassword:FC = () => {
    const navigate = useNavigate();
    const params = useParams();

    const token: string | undefined = params.token;

    const [username, setUsername] = useState<string>("");

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
            fetch("/user/reset-password", {
                method: "post",
                body: `username=${username}&password=${password1}`,
                headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }})
                .then(response => {
                    setOpen(true);
                    setTimeout(() => navigate("/profile"), 1500);
                })
        }
    }

    function CheckToken(){
        fetch("/user/check-token", {
            method: "post",
                body: `token=${token}`,
                headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }})
                .then(response => response.json())
                .then(response =>{
                    if (response.valid){
                        setUsername(response.message);
                    }
                    else{
                        setLink(false);
                        setMessage(response.message);
                    }
                })
    }

    useEffect(CheckToken, []);

    return (
        <>
        <Topnav />
        <Blobs />

        <Alert severity={"success"} handleClose={handleClose} open={open} text={"The password has been saved successfully!"} />

        {validLink ? (
            <Form loading={loading}>
                <FormInput label="Password" value={password1} setValue={setPassword1} />
                <FormInput label="Repeat password" value={password2} setValue={setPassword2} error={error}/>
                <button onClick={resetPassword}>Confirm</button>
            </Form>
            ):(
                <h1 className={styles.invalid__link} >{ message }</h1>
            )
        }
        </>
    )
}

export default ResetPassword;