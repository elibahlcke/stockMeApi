import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Confirm from "./Confirm";
import { Grid, MenuItem, TextField } from "@mui/material";
import SelectInput from "../../common/SelectInput";
import { useDispatch } from "react-redux";
import { Context } from "../../common/hooks";
import { postProduct } from "../../../redux/Actions/products";

const generos = [
    {value: "hombre", label:"Hombre"},
    {value: "mujer", label:"Mujer"},
    {value: "niños", label:"Niños"}
]
export default function Entradas({ openDialog, handleClose }) {
	const [state, setState] = useState({
		categoria: "",
		code: "",
		descripcion: "",
		color: "",
		talle: "",
		genero: "",
		fecha: new Date(),
		precio: undefined,
		cantidad: undefined
	});
    const {
		actions: { hideLoading, showLoading }
	} = useContext(Context);

    const dispatch = useDispatch();
    const handleAddProduct = () => {
        showLoading();
        dispatch(postProduct(state, hideLoading, hideLoading))
    }
	const inputProps = (name, label) => ({
		label,
		value: state[name],
		onchange: ({ target: { value } }) =>
			setState((ps) => ({ ...ps, [name]: value }))
	});
	return (
		<Confirm {...{ openDialog, handleClose, title: "Agregar nuevo producto" , handleConfirm: handleAddProduct}}>
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
						<TextField  fullWidth {...inputProps("precio", "Precio")} />
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
