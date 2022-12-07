import { useState } from "react"

export const useLogin = () => {
    const [token, setToken] = useState()

    const getToken = () => {
        const tokenString = localStorage.getItem('token')
        const tk = JSON.parse(tokenString);
        setToken(tk?.token)
    };

      return {token, getToken}
}