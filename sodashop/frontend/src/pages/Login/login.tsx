import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { validationEmail } from "../../hooks/validations";
import { Topnav } from "../../components/global/topnav/topnav";
import { Blobs } from "../../components/global/blobs/blobs";
import { Form } from "../../components/form/form";
import styles from "./login.module.scss";
import { FormInput } from "../../components/form/formInput/formInput";
import { Title } from "../../components/form/formTitle/formTitle";
import { resetPassword } from "./reset";


const Login:FC = () => {
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

        fetch("/user/login-user", {
            method: "post",
            body:  `username=${username}&password=${password}`,
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            }})
            .then(response => response.json())
            .then(response =>  {
                setLoading(false);
                if (response.status === "valid"){
                    navigate("/profile");
                }
                else{
                    setError(response.errors.username[0]);
                }
        });
    }

    useEffect(() => {
        setEmailError(validationEmail(email) ? "" : "Write correct email");
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
                <button onClick={() => resetPassword(email, setLoading, setResetText)}>Send mail to reset password</button>
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

export default Login;