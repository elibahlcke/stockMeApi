import { Grid, IconButton, InputAdornment, Paper, SvgIcon, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext, useState } from "react";
import { Context } from "../../common/hooks";
import { useDispatch } from "react-redux";
import { findProduct } from "../../../redux/Actions/products";

const Salidas = () => {
	const [search, setSearch] = useState("");
	const {
		loading,
		actions: {hideLoading, showLoading}
	} = useContext(Context);
	const dispatch = useDispatch();
	const handleSearch = () => {
		showLoading();
		dispatch(findProduct(search, hideLoading, hideLoading));
	};
	return (
		<>
			<Paper elevation={0} className="sm-paper">
				<Typography variant="h5"> Salidas </Typography>
				<Grid container spacing={1} sx={{ mt: 2, height: "100%" }}>
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
					</Grid>
			</Paper>
		</>
	);
};

export default Salidas;
