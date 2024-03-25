import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";


const PrivateRoute = () => {
    const [auth, setAuth] = useState(true);
    const [loading, setLoading] = useState(true);

    function getAuth(){
        fetch("/user/get-current-user")
            .then(() => {
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

export default PrivateRoute;
