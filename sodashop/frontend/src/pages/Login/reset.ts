import { validationEmail } from "../../hooks/validations";
import { Dispatch } from "react";


export function resetPassword(email : string, setLoading : Dispatch<boolean>, setResetText : Dispatch<string>){
    if (validationEmail(email)){
        setLoading(true);
        setResetText("");
        
        fetch(`/user/get-reset-token/${email}`)
            .then(response => response.json())
            .then(response => {
                    setLoading(false);
                    setResetText(response);
                }
            )
    }
}