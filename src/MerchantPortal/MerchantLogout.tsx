import { useEffect } from "react";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
// @ts-ignore
import Cookies from 'js-cookie';
export default function MerchantLogout() {

    const navigate = useNavigate();
    const logout = async () => {
        Cookies.remove('merchantToken')
        navigate('/merchant/login');
    }

    useEffect(() => {
        logout();
    }, []);
    return <></>;
}