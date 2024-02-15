import { FC, useState, useEffect } from "react";
import { Blobs } from "../../components/global/blobs/blobs";
import { useNavigate } from "react-router-dom";
import { Topnav } from "../../components/global/topnav/topnav";
import { Footer } from "../../components/global/footer/footer";
import { getUserInfo } from "../../hooks/useCurrentUser";
import { Orders } from "../../components/order/order";
import Alert from "../../components/Alert";
import styles from "./profile.module.scss";
import { ProfileInput } from "../../components/profileInput/profileInput";


const Profile: FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [adress, setAdress] = useState<string>("");

    const [usernameError, setUsernameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");
    const [adressError, setAdressError] = useState<string>("");

    const [changed, setChanged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    function logout(){
        fetch("/user/logout")
            .then(() => {
                navigate("/");
            })
    }

    function confirmAndSave(){
        setChanged(false);
        setLoading(true);

        fetch("/user/change-fields", {
            method: "post",
            body: `username=${username}&email=${email}&adress=${adress}&phone=${phone}`,
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            }})
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                if (response.status === "valid"){
                    setUsernameError("");
                    setEmailError("");
                    setPhoneError("");
                    setOpen(true);
                }
                else{
                    const errors = response.errors;
                    setUsernameError(errors.username[0]);            
                    setEmailError(errors.email[0]);
                    setPhoneError(errors.phone[0]);
                }
            })
    }

    useEffect(() => {
        getUserInfo({setUserName: setUsername, setEmail: setEmail, setPhone: setPhone, setAdress: setAdress});
    }, []);

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Topnav />
        <Blobs overflow={""} />

        <Alert severity={"success"} handleClose={handleClose} open={open} text={"The changes are saved!"} />

        <div className={styles.wrapper}>
            <div className={styles.profile} >
                <div className={styles.fields + " " + (loading ? styles.loading : "")}>
                    <ProfileInput label="Username" value={username} setValue={setUsername} setChanged={setChanged} error={usernameError}/>
                    <ProfileInput label="Email" value={email} setValue={setEmail} setChanged={setChanged} error={emailError}/>
                    <ProfileInput label="Phone number" value={phone} setValue={setPhone} setChanged={setChanged} error={phoneError}/>
                    <ProfileInput label="Adress" value={adress} setValue={setAdress} setChanged={setChanged} error={adressError}/>

                    {changed ? (
                        <button className={styles.button} onClick={confirmAndSave}>confirm and save changes</button>
                    ):( <></> )}
                </div>

                <Orders />

                <div className={styles.button__wrapper}>
                    <button className={styles.button} onClick={logout}>Log out</button>
                </div>
            </div>
        </div>

        <Footer />
        </>
    )
}

export default Profile;