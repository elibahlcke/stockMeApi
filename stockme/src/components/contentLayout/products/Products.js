import {
	Button,
	Grid,
	IconButton,
	InputAdornment,
	Paper,
	SvgIcon,
	TextField,
	Typography
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
	findProduct,
	getFilterProduct,
	getProducts
} from "../../../redux/Actions/products";
import Entradas from "./Entradas";
import { Context, usePageDialog } from "../../common/hooks";
import SelectInput from "../../common/SelectInput";

const Products = () => {
	const [state, setState] = useState({
		id: null,
		categoria: "",
		code: "",
		descripcion: "",
		color: "",
		talle: "",
		genero: "",
		fecha: new Date(),
		precio: null,
		cantidad: null
	});
	const [search, setSearch] = useState("");
	const store = useSelector((state) => state.products, shallowEqual);
	const rows = store?.products.map((item, index) => ({
		...item,
		id: index + 1
	})) || [{}];

	const dispatch = useDispatch();
	const { openDialog, setOpenDialog, handleClose } = usePageDialog();

	useLayoutEffect(() => {
		if (state?.categoria === "" && search === "") {
			showLoading();
			dispatch(getProducts(hideLoading, hideLoading));
		}
	}, [state?.categoria, search]);

	useEffect(() => {
		hideLoading();
	}, []);
	const {
		loading,
		actions: { hideLoading, showLoading }
	} = useContext(Context);

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
	useEffect(() => {
		if (state.categoria !== "") {
			showLoading();
			dispatch(getFilterProduct(state?.categoria, hideLoading, hideLoading));
		}
	}, [state?.categoria]);
	const handleSearch = () => {
		showLoading();
		dispatch(findProduct(search, hideLoading, hideLoading));
	};
	return (
		<>
			<Paper elevation={0} className="sm-paper">
				<Typography variant="h5"> Productos </Typography>
				<Grid container spacing={1} sx={{ mt: 2, height: "100%" }}>
					<Grid
						item
						container
						justifyContent="space-between"
						alignContent="flex-start"
						xs={12}>
						<Grid item xs={6}>
							<SelectInput {...{ state, setState, loading }} />
						</Grid>
						<Grid item xs={3}>
							<Button
								sx={{ mr: 4 }}
								startIcon={<AddIcon />}
								className="button-hover"
								onClick={() => setOpenDialog(true)}
								disabled={loading}>
								Agregar nuevo producto
							</Button>
						</Grid>
					</Grid>
					<Grid
						item
						container
						xs={12}
						sx={{ mt: 0, mb: 0, ml: 0 }}
						justifyContent="flex-start">
						<Grid item xs={6}>
							<TextField
								placeholder="Buscar por codigo o descripcion"
								label="Buscar por codigo"
								disabled={loading}
								onChange={({ target: { value } }) =>
									setSearch(value ? value : "")
								}
								isClearable
								value={search}
								fullWidth
								InputProps={{
									endAdornment: (
										<InputAdornment
											position="end"
											sx={{
												display: search !== "" ? "block" : "none",
												alignSelf: "center",
												cursor: "pointer",
												mb: 3,
												mr: 2
											}}>
											<SvgIcon fontSize="small" sx={{ mb: 3}}>
												<ClearIcon
													onClick={() => setSearch("")}
													className="button-hover"
												/>
											</SvgIcon>
										</InputAdornment>
									)
								}}
								sx={{
									maxHeight: "38px",
									ml: 0

								}}
							/>
						</Grid>
						<Grid item xs={1} sx={{ ml: 0}}>
							<IconButton
								size="large"
								color="secondary"
								className="button-hover"
								sx={{ verticalAlign: "center"}}
								onClick={handleSearch}>
								<SvgIcon fontSize="large">
									<SearchIcon/>
								</SvgIcon>
							</IconButton>
						</Grid>
					</Grid>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						sx={{
							maxHeight: "60%",
							backgroundColor: "rgba(255,255,255, .8)",
							mb: 1
						}}
					/>
				</Grid>
				<Entradas {...{ openDialog, handleClose }} />
			</Paper>
		</>
	);
};

export default Products;
