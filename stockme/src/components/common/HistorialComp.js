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
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "./hooks";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import { findProduct, getProducts } from "../../redux/Actions/products";

const HistorialComp = ({getHistorial, findHistoryItem, findByDate, handleStock, origin}) => {
	const [search, setSearch] = useState("");
	const [value, setValue] = useState(1);
	const [dates, setDates] = useState({ from: null, to: null });
	const {
		loading,
		actions: { hideLoading, showLoading }
	} = useContext(Context);
	const dispatch = useDispatch();
	useEffect(() => {
		if (value === 2 && search === "" && (!dates.from || !dates.to)) {
			showLoading();
			dispatch(getHistorial(hideLoading, hideLoading));
		}
		if (value === 1 && search === "" && (!dates.from || !dates.to)) {
			showLoading();
			dispatch(getProducts(hideLoading, hideLoading));
		}
	}, [value, search, dates]);
	const store = useSelector((state) => state.products, shallowEqual);
	const rows = store?.products?.map((item) => ({
		...item,
		id: item._id
	})) || [{}];
	const handleSearch = () => {
		showLoading();
		const action = value === 1 ? findProduct : findHistoryItem;
		dispatch(action(search, hideLoading, hideLoading));
	};
	const handleSearchByDate = () => {
		if (value === 1 || (!!dates.from && !!dates.to)) {
			showLoading();
			dispatch(findByDate(dates, hideLoading, hideLoading));
		}
		else toast.warning("Necesita ingresar ambas fechas para buscar")
	};
	const columns = [
		{ field: "code", headerName: "Code", width: 150 },
		{
			field: "descripcion",
			headerName: "Description",
			width: 300,
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
			width: 80,
			editable: false
		},
		{
			field: "cantidad",
			headerName: `${value === 1 ? "Stock" : "Cantidad"}`,
			width: 80,
			editable: value === 1
		},
		{
			field: "fecha",
			headerName: "Fecha",
			width: 140,
			editable: false,
			hide: value === 1,
			valueGetter: (params) => Moment(params.row.fecha).format("DD-MM-YYYY")
		}
	];
    const title = origin === "salidas" ? "Remover" : "Agregar"
	return (
		<>
			<Grid container direction="column" wrap="nowrap">
				<Tabs
					value={value}
					onChange={(_, v) => setValue(v)}
					centered
					sx={{ mb: 2 }}>
					<Tab value={1} label={`${title} Stock`} />
					<Tab value={2} label="Historial" />
				</Tabs>
				<Paper elevation={0} className="sm-paper">
					<Typography variant="h5">
						{`${value === 1 ? title : "Historial de"} stock`}
					</Typography>
					<Typography variant="h6">
						{`Busque por codigo o descripcion ${
							value === 1
								? `del stock que quiere ${title}`
								: `para conocer el historial de ${origin === "salidas" ? "salidas" : "entradas"}`
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
							<Grid item xs={7}>
								<TextField
									placeholder="Buscar por codigo o descripcion"
									label="Buscar por codigo o descripcion"
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
						</Grid>
						{value === 2 && (
							<Grid item container xs={8} spacing={3}>
								<Grid item xs={5}>
									<DatePicker
										label="Desde"
										value={dates.from}
										onChange={(newValue) => {
											setDates((ps) => ({ ...ps, from: new Date(newValue) }));
										}}
										format
										fullWidth
										renderInput={(params) => (
											<div
												style={{
													position: "relative",
													display: "inline-block"
												}}>
												<TextField {...params} />
												{dates.from && (
													<IconButton
														style={{
															position: "absolute",
															top: ".5rem",
															margin: "auto",
															right: "2rem"
														}}
														onClick={() =>
															setDates((ps) => ({ ...ps, from: null }))
														}>
														<ClearIcon />
													</IconButton>
												)}
											</div>
										)}
									/>
								</Grid>
								<Grid item xs={5}>
									<DatePicker
										label="Hasta"
										value={dates.to}
										clearable
										onChange={(newValue) =>
											setDates((ps) => ({ ...ps, to: new Date(newValue) }))
										}
										fullWidth
										renderInput={(params) => (
											<div
												style={{
													position: "relative",
													display: "inline-block"
												}}>
												<TextField {...params} />
												{dates.to && (
													<IconButton
														style={{
															position: "absolute",
															top: ".5rem",
															margin: "auto",
															right: "2rem"
														}}
														onClick={() =>
															setDates((ps) => ({ ...ps, to: null }))
														}>
														<ClearIcon />
													</IconButton>
												)}
											</div>
										)}
									/>
								</Grid>
								<Grid item xs={1} sx={{ ml: 0 }}>
									<IconButton
										size="large"
										color="secondary"
										className="button-hover"
										sx={{ verticalAlign: "center" }}
										onClick={handleSearchByDate}>
										<SvgIcon fontSize="large">
											<SearchIcon />
										</SvgIcon>
									</IconButton>
								</Grid>
							</Grid>
						)}
						<Grid item xs={12} sx={{ height: "100%" }}>
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
								experimentalFeatures={{ newEditingApi: true }}
								onCellEditStop={(params, event) => {
									if (params?.reason === GridCellEditStopReasons.cellFocusOut) {
										event.defaultMuiPrevented = true;
									}
									dispatch(
										handleStock(
											{
												id: params.row?._id,
												prevValue: params.row?.cantidad,
												filter: {
													[`${params.colDef.field}`]: event.target?.value
												},
												code: params.row?.code,
												descripcion: params.row?.descripcion,
												talle: params.row?.talle,
												color: params.row?.color
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
HistorialComp.propTypes = {
    getHistorial: PropTypes.func, 
    findHistoryItem: PropTypes.func, 
    findByDate: PropTypes.func, 
    handleStock: PropTypes.func,
    origin: PropTypes.string
};
HistorialComp.defaultProps = {
    getHistorial: () => {}, 
    findHistoryItem: () => {}, 
    findByDate: () => {}, 
    handleStock: () => {},
    origin: "salidas"
}
export default HistorialComp;
