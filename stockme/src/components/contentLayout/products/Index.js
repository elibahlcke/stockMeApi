import {
	Button,
	Grid,
	Paper,
	Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import React, { useLayoutEffect, useState } from "react";
import Select from 'react-select';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/Actions/products";

export default function Products() {
	const [state, setState] = useState({
		id: null,
		categoria: 1,
		code: "",
		description: "",
		color: "",
		talle: "",
		genero: "",
		fecha: new Date(),
		precio: null,
		cantidad: null
	});
	const store = useSelector((state) => state.products, shallowEqual);
	const rows = store?.products.map((item, index) => ({
		...item,
		id: index + 1
	})) || [{}];
	console.log(rows);
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		dispatch(getProducts());
	}, []);
	const categorias = [
		{ value: "Accesorios", label: "Accesorios" },
		{ value: "Beanies", label: "Beanies" },
		{ value: "Bermudas", label: "Bermudas" },
		{ value: "nikinis", label: "Bikinis" },
		{ value: "Boardshort", label: "Boardshort" },
		{ value: "Boxer", label: "Boxer" },
		{ value: "Camisas MC", label: "Camisas MC" },
		{ value: "Camisas ML", label: "Camisas ML" },
		{ value: "Caps", label: "Caps" },
		{ value: "Crew", label: "Crew" },
		{ value: "Denim", label: "Denim" },
		{ value: "Hood", label: "Hood" },
		{ value: "Jackets", label: "Jackets" },
		{ value: "Medias", label: "Medias" },
		{ value: "Mochilas", label: "Mochilas" },
		{ value: "Ojotas", label: "Ojotas" },
		{ value: "Pantalones", label: "Pantalones" },
		{ value: "Polleras", label: "Polleras" },
		{ value: "Remeras MC", label: "Remera MC" },
		{ value: "Remera ML", label: "Remera ML" },
		{ value: "Short", label: "Short" },
		{ value: "Vestidos", label: "Vestidos" },
		{ value: "Skate", label: "Skate" },
		{ value: "Ziphood", label: "Ziphood" }
	];
	const inputProps = (name, label, isCategory) => {
		const commonprops = {
			label,
			value: state[name],
			onChange: ({ target: { value } }) =>
				setState((ps) => ({ ...ps, [name]: value }))
		};
		if (isCategory)
			return {
				...commonprops,
				onChange: ({ target: { value } }) => console.log(value)
			};
		return commonprops;
	};

	const columns = [
		{ field: "id", headerName: "ID", width: 90 },
		{
			field: "description",
			headerName: "Description",
			width: 150
		},
		{
			field: "color",
			headerName: "color",
			width: 150
		},
		{
			field: "talle",
			headerName: "talle",
			width: 110
		},
		{
			field: "cantidad",
			headerName: "cantidad",
			width: 160
		},
		{
			field: "precio",
			headerName: "precio",
			width: 110
		}
	];

	return (
		<>
			<Paper elevation={0} className="sm-paper">
				<Typography variant="h5"> Productos </Typography>
				<Grid container sx={{ mt: 2, height: "100%" }}>
					<Grid item xs={8}>
                    <Select options={categorias} {...inputProps("categorias", "Categorias")} />
					</Grid>
					<Grid item xs={4}  alignSelf="center">
						<Button
							startIcon={<AddIcon />}
							className="button-hover">
							Add new product
						</Button>
					</Grid>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						sx={{ maxHeight: "60%", backgroundColor: "rgba(255,255,255, .8)" }}
					/>
				</Grid>
			</Paper>
		</>
	);
}
