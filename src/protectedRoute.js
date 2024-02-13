import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const loggedIn = localStorage.getItem('isAuthenticated');   

    if(!loggedIn){
        return <Navigate to="/login" replace/>
    }else{
        return Element()
    }
};

export default ProtectedRoute;
