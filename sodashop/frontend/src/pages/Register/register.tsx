import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../components/form/formInput/formInput";
import { Topnav } from "../../components/global/topnav/topnav";
import { Blobs } from "../../components/global/blobs/blobs";
import { Form } from "../../components/form/form";
import { Title } from "../../components/form/formTitle/formTitle";


const Register:FC = () => {
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
        setLoading(true);

        fetch("/user/register-user", {
            method: "post",
            body: `username=${username}&password=${password}&email=${email}`,
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            }})
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                if(response.status === "valid"){
                    const token = response.message;
                    navigate(`/confirm/${token}`);
                }
                else{
                    setError1(response.errors.username[0]);
                    setError2(response.errors.email[0]);
                    setError3(response.errors.password[0]);
                }
            })
    }

    useEffect(() =>{
        if (email.length > 0 && password.length > 0 && username.length > 0){
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
                <FormInput type="email" label="Email" value={email} setValue={setEmail} error={error2}/>
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

export default Register;