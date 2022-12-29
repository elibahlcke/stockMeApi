import React from "react";
import PropTypes from "prop-types";
import {
	FormControl,
	IconButton,
	InputAdornment,
	TextField
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const InputPasswordText = ({
	label,
	value,
	showPassword,
	handleClickShowPassword,
	handleSubmit,
	...other

}) => {
	return (
		<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
			{
				<TextField
					id="outlined-adornment-password"
					type={showPassword ? "text" : "password"}
					value={value}
					label={label}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								edge="end">
								{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
							</IconButton>
						</InputAdornment>)
						
					}}
					{...other}
					onKeyDown={(event) => {
						if(event.code === "Enter") handleSubmit();}}
				/>
			}
		</FormControl>
	);
};

InputPasswordText.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	showPassword: PropTypes.bool,
	handleClickShowPassword: PropTypes.func,
	handleSubmit: PropTypes.func

};

InputPasswordText.defaultProps = {
	label: "",
	value: "",
	showPassword: false,
	handleClickShowPassword: () => {},
	handleSubmit: () => {}

};

export default InputPasswordText;
