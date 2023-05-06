import React, {useState} from 'react';
import {getCookie, setCookie} from "typescript-cookie";
import {authService} from "../services/auth.service";

const UseAuth = () => {
    const [token, setToken] = useState(getCookie("flightAccess"));

    const getCredential = async (signal: AbortSignal) => {
        const payload = {
            Username: process.env.REACT_APP_USERNAME || "",
            Password: process.env.REACT_APP_PASSWORD || ""
        }
        try {
            const {data} = await authService(payload, signal);
            setCookie("flightAccess", data.Value.Token, {expires: 1});
            setToken(data.Value.Token);
            // console.log(data.Value.Token);
        } catch (e) {
            return e;
        }
    }

    return {token, getCredential};
};

export default UseAuth;
