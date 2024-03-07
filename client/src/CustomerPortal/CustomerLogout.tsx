import { useEffect } from "react";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
// @ts-ignore
import Cookies from 'js-cookie';
export default function CustomerLogout() {

    const navigate = useNavigate();
    const logout = async () => {
        Cookies.remove('customerToken')
        navigate('/customer/login');
    }

    useEffect(() => {
        logout();
    }, []);
    return <></>;
}