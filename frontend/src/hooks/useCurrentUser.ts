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
        .then(response => {
            if (response.status === 200){
                return response.json()
            }
        })
        .then(data => {
            const info = data.info;
            if (setUserName){
                setUserName(info.username);
            }
            if (setEmail){
                setEmail(info.email);
            }
            if (setPhone){
                setPhone(info.phone);
            }
            if (setAdress){
                setAdress(info.adress);
            }
        })
}
