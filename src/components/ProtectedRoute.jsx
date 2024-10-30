import {Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import {useState, useEffect} from 'react';

function ProtectedRoute({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthenticated(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        // if (!refreshToken) {
        //     setIsAuthenticated(false);
        //     return;
        // }

        try {
            const response = await api.post('/auth/token/refresh/', {refresh: refreshToken});

            if (response.status !== 200) {
                setIsAuthenticated(false);
                // return;
            } else {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            await refreshToken();
        } else {
            setIsAuthenticated(true);
        }
    }

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;

   
    // const decodedToken = jwtDecode(token);
    // const currentTime = Date.now() / 1000;

    // if (decodedToken.exp < currentTime) {
    //     api.post('/auth/token/refresh/', {refresh: refreshToken})
    //         .then(response => {
    //             localStorage.setItem(ACCESS_TOKEN, response.data.access);
    //         })
    //         .catch(() => {
    //             return <Navigate to="/login" />;
    //         });
    // }

    // return children;
}

export default ProtectedRoute;