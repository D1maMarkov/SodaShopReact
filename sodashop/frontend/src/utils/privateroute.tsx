import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";


export const PrivateRoute = () => {
    const [auth, setAuth] = useState(true);
    const [loading, setLoading] = useState(true);

    function getAuth(){
        fetch("/user/get-current-user")
            .then(response => {
                setLoading(false);
                setAuth(true);
            })
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