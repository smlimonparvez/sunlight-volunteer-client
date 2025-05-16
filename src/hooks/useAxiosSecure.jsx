import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router";


const axiosInstance = axios.create({
    baseURL:'https://rs9-a11-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();

     useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('api response error status', error.status);
            if (error.status === 401 || error.status === 403) {
                logOut()
                    .then(() => {
                        // redirect to the login page
                        navigate('/login')
                    })
                    .catch(err => console.log(err))
            }
            return Promise.reject(error);
        })
    }, [])

    return axiosInstance;
   
};

export default useAxiosSecure;