import { Dispatch } from "react";


type TypeUserInfo = {
    setUserName?: Dispatch<string> | Dispatch<string | null>;
    setEmail?: Dispatch<string>,
    setPhone?: Dispatch<string>,
    setAdress?: Dispatch<string>,
}


export const getUserInfo = ({setUserName, setEmail, setPhone, setAdress} : TypeUserInfo) => {
    let xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            if (setUserName){
                setUserName(xhttp.response.username);
            }
            if (setEmail){
                setEmail(xhttp.response.email);
            }
            if (setPhone){
                setPhone(xhttp.response.phone);
            }
            if (setAdress){
                setAdress(xhttp.response.adress);
            }
        }
    }
   
    xhttp.open("POST", "/user/get-user-info", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send();
}