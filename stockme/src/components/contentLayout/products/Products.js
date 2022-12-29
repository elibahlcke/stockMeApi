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
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Moment from "moment";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
	deleteProducts,
	findProduct,
	getFilterProduct,
	getProducts,
	updateProduct
} from "../../../redux/Actions/products";
import Entradas from "./Entradas";
import { Context, usePageDialog } from "../../common/hooks";
import SelectInput from "../../common/SelectInput";
import Confirm from "./Confirm";

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
		cantidad: null,
		deletedOn: new Date("1970-01-01T00:00:00.000+00:00")
	});
	const [search, setSearch] = useState("");
	const [deleteData, setDeleteData] = useState([]);
	const store = useSelector((state) => state.products, shallowEqual);
	const rows = store?.products.map((item) => ({
		...item,
		id: item._id
	})) || [{}];

	const dispatch = useDispatch();
	const { openDialog, setOpenDialog, handleClose } = usePageDialog();
	const {
		openDialog: openDialogDelete,
		setOpenDialog: setOpenDelete,
		handleClose: handleCloseDelete
	} = usePageDialog();
	useLayoutEffect(() => {
		if (state?.categoria === "" && search === "" && !openDialog && !openDialogDelete) {
			showLoading();
			dispatch(getProducts(hideLoading, hideLoading));
		}
	}, [state?.categoria, search, openDialog, openDialogDelete]);
	const onAction = () => {
		if (deleteData.length > 0) {
			showLoading();
			dispatch(deleteProducts(deleteData, onSuccess, onSuccess));
		}
	};
	useEffect(() => {
		hideLoading();
	}, []);
	const {
		loading,
		actions: { hideLoading, showLoading }
	} = useContext(Context);
	const onSuccess = () => {
		hideLoading();
		setOpenDialog(false);
		setOpenDelete(false)
	};
	const columns = [
		{ field: "code", headerName: "Code", width: 90 },
		{
			field: "descripcion",
			headerName: "Description",
			width: 150,
			editable: true
		},
		{
			field: "color",
			headerName: "color",
			width: 150,
			editable: true
		},
		{
			field: "talle",
			headerName: "talle",
			width: 110,
			editable: true
		},
		{
			field: "cantidad",
			headerName: "cantidad",
			width: 160,
			cellClassName: (params) => params.value === 0 ? "cell-style" : "",
		},
		{
			field: "precio",
			headerName: "precio",
			width: 110,
			editable: true
		},
		{
			field: "fecha",
			headerName: "Fecha",
			width: 110,
			valueGetter: (params) => Moment(params.row.fecha).format("DD-MM-YYYY")
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
				<Typography variant="h8"> Seleccione una categoria para filtrar los resultados o ingrese codigo/descripcion para buscar </Typography>
				<Typography variant="h8"> Doble click en cada casillero para editar info y presione enter para enviar </Typography>
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
						sx={{ mt: 3, mb: 3, ml: 0 }}
						justifyContent="flex-start">
						<Grid item xs={6}>
							<TextField
								placeholder="Buscar por codigo o descripcion"
								label="Buscar por codigo"
								disabled={loading}
								onChange={({ target: { value } }) =>
									setSearch(value ? value : "")
								}
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
											<SvgIcon fontSize="medium" sx={{ mb: 3 }}>
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
						<Grid item xs={1} sx={{ ml: 0 }}>
							<IconButton
								size="large"
								color="secondary"
								className="button-hover"
								sx={{ verticalAlign: "center" }}
								onClick={handleSearch}>
								<SvgIcon fontSize="large">
									<SearchIcon />
								</SvgIcon>
							</IconButton>
						</Grid>
						{deleteData.length > 0 && (
							<Grid item xs={4} sx={{ textAlign: "right", mr: 1, mt: 1 }}>
								<Button
									variant="outlined"
									size="small"
									className="button-hover"
									onClick={() => setOpenDelete(true)}>
									Borrar Seleccionados
								</Button>
							</Grid>
						)}
					</Grid>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={6}
						checkboxSelection
						onSelectionModelChange={(data) => setDeleteData(data)}
						rowsPerPageOptions={[6]}
						sx={{
							maxHeight: "60%",
							backgroundColor: "rgba(255,255,255, .8)",
							mb: 1
						}}
						experimentalFeatures={{ newEditingApi: true }}
						onCellEditStop={(params, event) => {
							if (params.reason === GridCellEditStopReasons.cellFocusOut) {
								event.defaultMuiPrevented = true;
							}

							dispatch(
								updateProduct(
									{
										id: params.row?._id,
										filter: { [`${params.colDef.field}`]: event.target?.value }
									},
									hideLoading,
									hideLoading
								)
							);
						}}
					/>
				</Grid>
				<Entradas {...{ openDialog, handleClose }} />
				<Confirm
					{...{
						title: "Borrar productos",
						handleClose: handleCloseDelete,
						handleConfirm: onAction,
						openDialog: openDialogDelete,
						message: "Esta seguro que desea borrar los productos seleccionados?"
					}}
				/>
			</Paper>
		</>
	);
};

export default Products;
