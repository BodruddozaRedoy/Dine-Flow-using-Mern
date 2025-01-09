import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'zustand';
import { authStore } from '../store/authStore';
import Spinner from '../components/Spinner';

const PrivateRoute = ({children}) => {
    const {user, isLoading} = useStore(authStore)
    const location = useLocation()
    if(isLoading ) return <Spinner/>
    // if(!user || isLoading) return <Navigate state={{from:location}} to={'/login'}/>
    if(user){
        return children
    }
    
    return <Navigate state={location.pathname} to={'/login'}/>
    
};

export default PrivateRoute;