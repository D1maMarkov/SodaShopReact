import { Dispatch } from "react";


type TypeUserInfo = {
    setUserName?: Dispatch<string> | Dispatch<string | null>;
    setEmail?: Dispatch<string>,
    setPhone?: Dispatch<string>,
    setAdress?: Dispatch<string>,
}

export const getUserInfo = ({setUserName, setEmail, setPhone, setAdress} : TypeUserInfo) => {
    fetch("/user/get-user-info", {
        method: "post",
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then(response => response.json())
        .then(response => {
            if (response != "not autorized"){
                if (setUserName){
                    setUserName(response.username);
                }
                if (setEmail){
                    setEmail(response.email);
                }
                if (setPhone){
                    setPhone(response.phone);
                }
                if (setAdress){
                    setAdress(response.adress);
                }
            }
        }
    )
}

