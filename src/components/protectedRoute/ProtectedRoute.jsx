import { useEffect, useState } from "react";
import { checkAuthentication } from "../../services/AuthService";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({children, requiredRole}){

    const[isAuthenticated, setIsAuthenticated] = useState(null);
    const[user, setUser] = useState(null);

    const location = useLocation();

    useEffect(() => {
        async function checkAuth() {
            setIsAuthenticated(null);

            const currentUser = await checkAuthentication();

            setIsAuthenticated(currentUser !== null);
            setUser(currentUser);
        }

        checkAuth();
    }, [location.pathname]);

    if(isAuthenticated === null){
        return <p>Loading....</p>
    }

    if(isAuthenticated === false){
        return <Navigate to='/login'/>
    }

    if(requiredRole && !user.roles.includes(requiredRole)){
        return <Navigate to='/dashboard'/>
    }
    
    

    return children;
}