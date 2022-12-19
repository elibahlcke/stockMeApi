import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import InputText from "./components/common/InputPassword";
import { toast } from "react-toastify";

async function loginUser(credentials) {
    return fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .then(data => localStorage.setItem('token', JSON.stringify(data)))
    .catch(() => {
        toast.error('Wrong Credentials', {
        position: toast.POSITION.BOTTOM_LEFT,
        className: 'toast-error'
    })})
}

const Login = ({getToken}) => {
	const [state, setState] = useState({
        user: "",
        password: "",
        showPassword: false
    });
	const inputProps = (name, label) => ({
		label,
		value: state[name],
		onChange: ({ target: {value} }) => {
            value
            setState((ps) => ({ ...ps, [name]: value }))}
	});
    const handleSubmit = async e => {
        e && e.preventDefault();
        await loginUser({
            username: state.user,
            password: state.password
        });
        getToken();
    };
	const handleClickShowPassword = () => {
		setState((ps) => ({
			...ps,
			showPassword: !ps.showPassword
		}));
	};
    
	return (
        <>
		<Paper elevation={1} className="sm-login sm-paper">
			<Grid container direction="column" justifyContent="center">
				<Typography>Inicie Sesion</Typography>
				<Grid container justifyContent="center" alignItems="center">
					<Grid item xs={6}>
						<TextField {...inputProps("user", "Usuario")} />
					</Grid>
					<Grid item xs={6}>
						<InputText
							{...inputProps("password", "Password")}
							{...{handleSubmit}}
                            showPassword={state?.showPassword}
							handleClickShowPassword={handleClickShowPassword}
						/>
					</Grid>
					<Grid item xs={6} sx={{ mb: 2}}>
						<Button
							variant="outlined"
							color="primary"
							size="small"
                            sx={{ mr: 2}}
							onClick={() =>
								setState((ps) => ({ ...ps, user: "", password: "" }))
							}>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="primary"
							size="small"
                            type="submit"
                            onClick={handleSubmit}
							
                            sx={{ color: "#fff", fontWeight: "bold"}}
							>
							Save
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
        </>
	);
};

Login.propTypes = {
    getToken: PropTypes.func
};

Login.defaultProps = {
    getToken: () => {}
}
export default Login;
