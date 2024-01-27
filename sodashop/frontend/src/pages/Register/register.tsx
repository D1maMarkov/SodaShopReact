import { useState, useEffect, FC } from "react";
import { validationEmail } from "../../hooks/validations";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../components/form/formInput/formInput";
import { Topnav } from "../../components/global/topnav/topnav";
import { Blobs } from "../../components/global/blobs/blobs";
import { Form } from "../../components/form/form";
import { Title } from "../../components/form/formTitle/formTitle";


export const Register:FC = () => {
    const navigate = useNavigate();

    const [username, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [error1, setError1] = useState<string>("");
    const [error2, setError2] = useState<string>("");
    const [error3, setError3] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [activeBut, setActiveBut] = useState<boolean>(false);

    function register(){
        if (error2.length == 0){
            setLoading(true);
            let xhttp = new XMLHttpRequest();
            xhttp.responseType = 'json';
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4){
                    setLoading(false);
                    switch(this.status){
                        case 200:
                            const token = xhttp.response;
                            navigate(`/confirm/${token}`);
                            break;
                        case 202:
                            setError1("a user with this username already exists");
                            break;
                        case 201:
                            setError2("a user with this email already exists");
                            break;
                        case 203:
                            setError2("apparently you entered an incorrect email address");
                            break;
                    }
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
        validationEmail(email) ? setError2("") : setError2("invalid email address");
    }

    useEffect(() =>{
        if (email.length > 0 && password.length > 0 && username.length > 0 && error2.length == 0){
            setActiveBut(true);
        }
        else{
            setActiveBut(false);
        }
    }, [email, username, password]);

    return (
        <>
        <Topnav />
        <Blobs />
        
        <Form loading={loading}>
            <Title type={"register"} />

            <div>     
                <FormInput label="Username" value={username} setValue={setUser} error={error1}/>
                <FormInput type="email" label="Email" value={email} setValue={handleEmail} error={error2}/>
                <FormInput label="Password" value={password} setValue={setPassword} error={error3}/>

                {activeBut ? (
                    <button onClick={register}>Sign in</button>
                ):(
                    <button disabled>Sign in</button>
                )}
            </div>
        </Form>
        </>
    )
}