import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Confirm from "./Confirm";
import { Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import SelectInput from "../../common/SelectInput";
import { useDispatch } from "react-redux";
import { Context } from "../../common/hooks";
import { postProduct } from "../../../redux/Actions/products";

const generos = [
	{ value: "hombre", label: "Hombre" },
	{ value: "mujer", label: "Mujer" },
	{ value: "niños", label: "Niños" }
];
const initialState = {
    categoria: "",
    code: "",
    descripcion: "",
    color: "",
    talle: "",
    genero: "",
    fecha: new Date(),
    precio: undefined,
    cantidad: undefined
};
export default function Entradas({ openDialog, handleClose }) {
	const [state, setState] = useState(initialState);
	const {
		actions: { hideLoading, showLoading }
	} = useContext(Context);

	const dispatch = useDispatch();
	const handleAddProduct = () => {
		showLoading();
		dispatch(postProduct(state, () => {
            hideLoading();
			handleClose();
            setState(initialState)}, hideLoading));
	};
	const inputProps = (name, label) => ({
		label,
		value: state[name],
		onChange: ({ target: { value } }) =>
			setState((ps) => ({ ...ps, [name]: value }))
	});
	return (
		<Confirm
			{...{
				openDialog,
				handleClose: () => { setState(initialState);
                handleClose()},
				title: "Agregar nuevo producto",
				handleConfirm: handleAddProduct
			}}>
			<Grid container sx={{ mt: 1 }} spacing={2}>
				<Grid item container xs={12} justifyContent="space-between" spacing={2}>
					<Grid item xs={6}>
						<SelectInput fullWidth {...{ state, setState }} />
					</Grid>
					<Grid item xs={6} sx={{ mr: 0, textAlign: "right" }}>
						<TextField fullWidth select {...inputProps("genero", "Genero")}>
							{generos.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>
				<Grid item container xs={12} justifyContent="space-between" spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							{...inputProps("precio", "Precio")}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">$</InputAdornment>
								)
							}}
						/>
					</Grid>
					<Grid item xs={6} sx={{ mr: 0, textAlign: "right" }}>
						<TextField fullWidth {...inputProps("cantidad", "Cantidad")} />
					</Grid>
				</Grid>
				<Grid item container xs={12} spacing={2} justifyContent="space-between">
					<Grid item xs={4}>
						<TextField {...inputProps("code", "Codigo")} />
					</Grid>
					<Grid item xs={4}>
						<TextField {...inputProps("talle", "Talle")} />
					</Grid>
					<Grid item xs={4}>
						<TextField {...inputProps("color", "Color")} />
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<TextField fullWidth {...inputProps("descripcion", "Descripcion")} />
				</Grid>
			</Grid>
		</Confirm>
	);
}

Entradas.propTypes = {
	openDialog: PropTypes.bool,
	handleClose: PropTypes.func
};
Entradas.defaultProps = {
	openDialog: false,
	handleClose: () => {}
};
