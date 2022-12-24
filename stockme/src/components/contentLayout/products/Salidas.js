import {
	Grid,
	IconButton,
	InputAdornment,
	Paper,
	SvgIcon,
	Tab,
	Tabs,
	TextField,
	Typography
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../common/hooks";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
	findProduct,
	findHistory,
	getHistorial,
	getProducts,
	removeStock
} from "../../../redux/Actions/products";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";

const Salidas = () => {
	const [search, setSearch] = useState("");
	const [value, setValue] = useState(1);
	const {
		loading,
		actions: { hideLoading, showLoading }
	} = useContext(Context);
	const dispatch = useDispatch();
	useEffect(() => {
		if (value === 2) {
			showLoading();
			dispatch(getHistorial(hideLoading, hideLoading));
		}
		if (value === 1) {
			showLoading();
			dispatch(getProducts(hideLoading, hideLoading));
		}
	}, [value]);
	const store = useSelector((state) => state.products, shallowEqual);
	const rows =
		store?.products.map((item) => ({
			...item,
			id: item._id
		})) || [];
	const handleSearch = () => {
		showLoading();
		const action = value === 1 ? findProduct : findHistory;
		dispatch(action(search, hideLoading, hideLoading));
	};
	const columns = [
		{ field: "code", headerName: "Code", width: 90 },
		{
			field: "descripcion",
			headerName: "Description",
			editable: false
		},
		{
			field: "color",
			headerName: "color",
			width: 150,
			editable: false
		},
		{
			field: "talle",
			headerName: "talle",
			width: 110,
			editable: false
		},
		{
			field: "cantidad",
			headerName: `${value === 1 ? "Stock" : "Cantidad"}`,
			width: 160,
			editable: true
		},
		{
			field: "fecha",
			headerName: "Fecha",
			width: 160,
			editable: false,
			hide: value === 1,
			valueGetter: (params) => Moment(params.row.fecha).format("DD-MM-YYYY")
		}
	];
	return (
		<>
			<Grid container direction="column" wrap="nowrap">
				<Tabs
					value={value}
					onChange={(_, v) => setValue(v)}
					centered
					sx={{ mb: 2 }}>
					<Tab value={1} label="Remover Stock" />
					<Tab value={2} label="Historial" />
				</Tabs>
				<Paper elevation={0} className="sm-paper">
					<Typography variant="h5">
						{`${value === 1 ? "Descontar" : "Historial de"} stock`}
					</Typography>
					<Typography variant="h6">
						{`Busque por codigo o descripcion ${
							value === 1
								? "del stock que quiere descontar"
								: "para conocer el historial de salidas"
						}`}
					</Typography>
					{value === 1 && (
						<Typography variant="h8">
							{" "}
							Doble click en la casilla de stock que quiera editar y presione
							enter para enviar{" "}
						</Typography>
					)}
					<Grid
						container
						spacing={1}
						alignContent="flex-start"
						sx={{ mt: 2, height: "100%" }}>
						<Grid
							item
							container
							xs={12}
							sx={{ mt: 0, mb: 0, ml: 0 }}
							justifyContent="flex-start">
							<Grid item xs={6}>
								<TextField
									placeholder="Buscar por codigo o descripcion"
									label="Buscar por codigo o descripcion"
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
												<SvgIcon fontSize="small" sx={{ mb: 3 }}>
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
						</Grid>
						<Grid item xs sx={{ height: "100%" }}>
							<DataGrid
								rows={rows}
								columns={columns}
								pageSize={6}
								rowsPerPageOptions={[6]}
								sx={{
									maxHeight: "60%",
									backgroundColor: "rgba(255,255,255, .8)",
									mb: 1
								}}
								experimentalFeatures={{ newEditingApi: value === 1 }}
								onCellEditStop={(params, event) => {
									if (params.reason === GridCellEditStopReasons.cellFocusOut) {
										event.defaultMuiPrevented = true;
									}
									dispatch(
										removeStock(
											{
												id: params.row?._id,
												prevValue: params.row?.cantidad,
												filter: {
													[`${params.colDef.field}`]: event.target?.value
												},
												code: params.row?.code,
												descripcion: params.row?.descripcion
											},
											hideLoading,
											hideLoading
										)
									);
								}}
							/>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</>
	);
};

export default Salidas;
