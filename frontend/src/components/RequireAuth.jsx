import React from 'react'
import { useAuth } from '../utls/auth'
import { Navigate } from 'react-router-dom';
const RequireAuth = ({ childen }) => {
    const auth = useAuth();
    if (!auth.user) {
        return <Navigate to={'/login'} />
    }
    return childen
}

export default RequireAuth
