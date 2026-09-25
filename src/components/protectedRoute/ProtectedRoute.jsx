import { useEffect, useState } from "react";
import { checkAuthentication } from "../../services/AuthService";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();

    useEffect(() => {
        async function checkAuth() {
            setIsAuthenticated(null);

            const user = await checkAuthentication();

            setIsAuthenticated(user !== null);
        }

        checkAuth();
    }, [location.pathname]);

    if(isAuthenticated === null){
        return <p>Loading....</p>
    }

    if(isAuthenticated === false){
        return <Navigate to='/login'/>
    }

    return children;
}