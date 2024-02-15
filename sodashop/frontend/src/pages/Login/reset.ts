import { Dispatch } from "react";


export function resetPassword(email : string, setLoading : Dispatch<boolean>, setEmailError: Dispatch<string>, setResetText : Dispatch<string>){
    setLoading(true);
    setResetText("");

    fetch(`/user/get-reset-token`, {
        method: "post",
        body: `&email=${email}`,
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then(response => response.json())
        .then(response => {
            setLoading(false);

            if (response.status === "valid"){
                setResetText(response.message);
            }
            else{
                setEmailError(response.errors.email[0]);
            }
        })
}