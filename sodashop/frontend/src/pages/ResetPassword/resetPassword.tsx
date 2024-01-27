import { useState, useEffect, FC } from "react";
import { Blobs } from "../../components/global/blobs/blobs";
import { Topnav } from "../../components/global/topnav/topnav";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/form/form";
import { FormInput } from "../../components/form/formInput/formInput";
import Alert from "../../components/Alert";
import styles from "./resetPassword.module.scss";


export const ResetPassword:FC = () => {
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
            let xhttp = new XMLHttpRequest();
      
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    setOpen(true);
                    setTimeout(() => navigate("/profile"), 1500);
                }
            }
        
            let params = `username=${username}&password=${password1}`;
        
            xhttp.open("POST", "/user/reset-password", true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(params);
        }
    }

    function CheckToken(){
        let xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setUsername(xhttp.response);
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
      
        xhttp.open("POST", "/user/check-token", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(params);
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
