import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { validationEmail } from "../../hooks/validations";
import { Topnav } from "../../components/Topnav/Topnav";
import { Blobs } from "../../components/Blobs/Blobs";
import { Form } from "../../components/User/Form/form";
import styles from "./login.module.scss";
import { FormInput } from "../../components/User/FormInput/formInput";
import { Title } from "../../components/User/FormTitle/formTitle";


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
        setLoading(true);
        let xhttp = new XMLHttpRequest();
      
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setLoading(false);
                navigate("/profile");
            }
            else if (this.readyState == 4 && this.status == 202){
                setLoading(false);
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
        !validationEmail(email) ? setEmailError("Write correct email") : setEmailError("");
    }, [email]);

    return (
        <>
        <Topnav />
        <Blobs />

        <Form loading={loading}>
            <Title type={"login"}/>
            
            {reset ? (
                <>
                    <FormInput label="email" value={email} setValue={setEmail} error={emailError}/>
                    <div className={styles.reset__mail}>{ resetText }</div>
                    <button onClick={Reset}>Send mail to reset password</button>
                </>
            ):(
                <>
                    <FormInput label="Username" value={username} setValue={setUser} error={error}/>
                    <FormInput type={"password"} label="Password" value={password} setValue={setPassword}/>
                    <a href="#" className={styles.reset__password} onClick={() => setReset(true)}>Forgotten password?</a><br/><br/>
                    <button onClick={login}>Login</button>
                </>
            )}
        </Form>
        </>
    )
}