import { Navigate, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";


export const PrivateRoute = () => {
    const [auth, setAuth] = useState(true);
    const [loading, setLoading] = useState(true);

    function getAuth(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setLoading(false);
                setAuth(true);
            }
            else{
                setLoading(false);
            }
        }
    
        xhttp.open("GET", "/user/get_current_user");
        xhttp.send();
    }

    useEffect(getAuth, []);

    return (
        <>
            {!loading ? (
                auth ? <Outlet /> : <Navigate to="login" />
            ):(
                <></>
            )}
        </>
    )
}