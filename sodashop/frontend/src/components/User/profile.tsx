import { FC, useState, useEffect } from "react";
import { Blobs } from "../Blobs/Blobs";
import { useNavigate } from "react-router-dom";
import { Topnav } from "../Topnav/Topnav";
import { Cart } from "../Cart/Cart";
import { Footer } from "../Footer/footer";
import { validationEmail, validationPhone } from "../../hooks/validations";
import { getUserInfo } from "../../hooks/useCurrentUser";
import { Orders } from "./Order/Order";
import Alert from "../Alert";
import styles from "./login.module.scss";


export const Profile: FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    const navigate = useNavigate();

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

        let input = document.getElementById("username") as HTMLAreaElement;
        if (username.length == 0){
            valid = false;
            setUsernameError("write non empty username");
            input.classList.add(styles.error__input);
        }
        else{
            setUsernameError("");
            input.classList.remove(styles.error__input);
        }

        input = document.getElementById("email") as HTMLAreaElement;
        if (!validationEmail(email)){
            valid = false;
            setEmailError("write correct email");
            input.classList.add(styles.error__input);
        }
        else{
            setEmailError("");
            input.classList.remove(styles.error__input);
        }

        input = document.getElementById("phone") as HTMLAreaElement;
        if (!validationPhone(phone)){
            valid = false;
            setPhoneError("write correct phone number");
            input.classList.add(styles.error__input);
        }
        else{
            setPhoneError("");
            input.classList.remove(styles.error__input);
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
        const fields = document.getElementsByClassName(styles.fields)[0] as HTMLElement;
        loading ? fields.classList.add(styles.loading) : fields.classList.remove(styles.loading);
    }, [loading]);

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Topnav color={"white"} />
        <Cart />
        <Blobs overflow={""} />

        <Alert severity={"success"} handleClose={handleClose} open={open} text={"The changes are saved!"} />

        <div className={styles.profile} >
            <div className={styles.fields}>
                <p>Username</p>
                <input id="username" value={ username } onChange={event => {setUsername(event.target.value); setChanged(true)}} /><br />
                <div className={styles.error} >{ usernameError }</div>

                <p>Email</p>
                <input id="email" value={ email } onChange={event => {setEmail(event.target.value); setChanged(true)}} /><br />
                <div className={styles.error} >{ emailError }</div>

                <p>Phone number</p>
                <input id="phone" value={ phone } onChange={event => {setPhone(event.target.value); setChanged(true)}} /><br />
                <div className={styles.error} >{ phoneError }</div>

                <p>Adress</p>
                <input id="adress" value={ adress } onChange={event => {setAdress(event.target.value); setChanged(true)}} /><br />
                <div className={styles.error} >{ adressError }</div>

                {changed ? (
                    <button  style={{ backgroundColor: "#f50057", width: "100%", marginLeft: "0px" }} onClick={confirmAndSave} >confirm and save changes</button>
                ):( <></> )
                }
            </div>
                        
            <Orders />

            <div style={{ marginTop: "50px", paddingBottom: "100px" }}>
                <button className={styles.logout} onClick={logout} >Log out</button>
            </div>
        </div>

        <Footer />
        </>
    )
}