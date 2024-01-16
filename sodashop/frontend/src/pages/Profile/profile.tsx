import { FC, useState, useEffect, useRef } from "react";
import { Blobs } from "../../components/Blobs/Blobs";
import { useNavigate } from "react-router-dom";
import { Topnav } from "../../components/Topnav/Topnav";
import { Footer } from "../../components/Footer/footer";
import { validationEmail, validationPhone } from "../../hooks/validations";
import { getUserInfo } from "../../hooks/useCurrentUser";
import { Orders } from "../../components/User/Order/Order";
import Alert from "../../components/Alert";
import styles from "./profile.module.scss";
import { ProfileInput } from "../../components/User/ProfileInput/profileInput";


export const Profile: FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    const navigate = useNavigate();

    const fields = useRef<HTMLDivElement>(null);

    const [username, setUsername] = useState<string>("username");
    const [email, setEmail] = useState<string>("email");
    const [phone, setPhone] = useState<string>("");
    const [adress, setAdress] = useState<string>("");

    const [usernameError, setUsernameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");
    const [adressError, setAdressError] = useState<string>("");

    const [changed, setChanged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    function logout(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                navigate("/");
            }
        }
    
        xhttp.open("GET", "/user/logout");
        xhttp.send();
    }

    function confirmAndSave(){
        let valid: boolean = true;

        if (username.length == 0){
            valid = false;
            setUsernameError("write non empty username");
        }
        else{
            setUsernameError("");
        }

        if (!validationEmail(email)){
            valid = false;
            setEmailError("write correct email");
        }
        else{
            setEmailError("");
        }

        if (!validationPhone(phone)){
            valid = false;
            setPhoneError("write correct phone number");
        }
        else{
            setPhoneError("");
        }

        if (valid){
            setChanged(false);
            setLoading(true);

            let xhttp = new XMLHttpRequest();
      
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    setLoading(false);
                    setOpen(true);
                }
            }
        
            let params = `username=${username}&email=${email}&adress=${adress}&phone=${phone}`;
   
            xhttp.open("POST", "/user/change-fields", true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(params);
        }
    }

    useEffect(() => {
        getUserInfo({setUserName: setUsername, setEmail: setEmail, setPhone: setPhone, setAdress: setAdress});
    }, []);
   
    useEffect(() => {
        if (fields.current != null && loading){
            loading ? fields.current.classList.add(styles.loading) : fields.current.classList.remove(styles.loading);
        }
    }, [loading]);

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Topnav />
        <Blobs overflow={""} />

        <Alert severity={"success"} handleClose={handleClose} open={open} text={"The changes are saved!"} />

        <div className={styles.profile} >
            <div className={styles.fields} ref={fields}>
                <ProfileInput label="Username" value={username} setValue={setUsername} setChanged={setChanged} error={usernameError}/>
                <ProfileInput label="Email" value={email} setValue={setEmail} setChanged={setChanged} error={emailError}/>
                <ProfileInput label="Phone number" value={phone} setValue={setPhone} setChanged={setChanged} error={phoneError}/>
                <ProfileInput label="Adress" value={adress} setValue={setAdress} setChanged={setChanged} error={adressError}/>

                {changed ? (
                    <button onClick={confirmAndSave}>confirm and save changes</button>
                ):( <></> )
                }
            </div>
      
            <Orders />

            <div className={styles.button__wrapper}>
                <button onClick={logout}>Log out</button>
            </div>
        </div>

        <Footer />
        </>
    )
}
// 157