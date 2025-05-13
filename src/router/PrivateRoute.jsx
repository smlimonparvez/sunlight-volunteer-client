import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../auth/AuthProvider';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
      return <Loading></Loading>;
    }
    if (user && user?.email) {
      return children;
    }
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;