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

            fetch("/user/register-user", {
                method: "post",
                body: `username=${username}&password=${password}&email=${email}`,
                headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }})
                .then(response => {
                    setLoading(false);
                    switch(response.status){
                        case 200:
                            const token = response.json();
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
                })
        }
    }

    function handleEmail(email: string){
        setEmail(email);
        setError2(validationEmail(email) ? "" : "invalid email address");
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