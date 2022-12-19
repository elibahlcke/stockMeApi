import React, { useState, createContext } from "react";
import '../../index.css';

export const useLogin = () => {
	const [token, setToken] = useState();

	const getToken = () => {
		const tokenString = localStorage.getItem("token");
		const tk = JSON.parse(tokenString);
		setToken(tk?.token);
	};

	return { token, getToken };
};

export const usePageDialog = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const handleClose = () => setOpenDialog(false);
    return {openDialog, setOpenDialog, handleClose}
} 
export const useLoading = () => {
    const [loading, setLoading] = useState(false);
    
    const actions = {
        hideLoading: () => setLoading(false),
        showLoading: () => setLoading(true)
    }
	const Loading = () => (
        <div className="animated-gradient"></div>
        );
        
        return { loading, Loading, actions };
    };
    export const Context = createContext();


