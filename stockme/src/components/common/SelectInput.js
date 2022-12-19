import { InputAdornment, MenuItem, SvgIcon, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import PropTypes from "prop-types";

const categorias = [
    { value: "accesorios", label: "Accesorios" },
    { value: "beanies", label: "Beanies" },
    { value: "bermudas", label: "Bermudas" },
    { value: "bikinis", label: "Bikinis" },
    { value: "boardshort", label: "Boardshort" },
    { value: "boxer", label: "Boxer" },
    { value: "camisas MC", label: "Camisas MC" },
    { value: "camisas ML", label: "Camisas ML" },
    { value: "caps", label: "Caps" },
    { value: "crew", label: "Crew" },
    { value: "denim", label: "Denim" },
    { value: "hood", label: "Hood" },
    { value: "jackets", label: "Jackets" },
    { value: "medias", label: "Medias" },
    { value: "mochilas", label: "Mochilas" },
    { value: "ojotas", label: "Ojotas" },
    { value: "pantalones", label: "Pantalones" },
    { value: "polleras", label: "Polleras" },
    { value: "remera mc", label: "Remera MC" },
    { value: "remera ml", label: "Remera ML" },
    { value: "short", label: "Short" },
    { value: "vestidos", label: "Vestidos" },
    { value: "skate", label: "Skate" },
    { value: "ziphood", label: "Ziphood" }
];

export default function SelectInput({ setState, state, loading }) {
	return (
		<TextField
			select
			label="Buscar por categoria"
			name="categorias"
			onChange={({ target: { value } }) =>
				setState((ps) => ({
					...ps,
					categoria: value
				}))
			}
			value={state.categoria ?? ""}
			sx={{ maxHeight: "35px" }}
			disabled={loading}
			fullWidth
			InputProps={{
				endAdornment: (
					<InputAdornment
						position="end"
						sx={{
							display: state.categoria !== "" ? "block" : "none",
							alignSelf: "center",
							cursor: "pointer",
							mb: 2,
							mr: 2
						}}>
						<SvgIcon size="small">
							<ClearIcon
								onClick={() => setState((ps) => ({ ...ps, categoria: "" }))}
								className="button-hover"
							/>
						</SvgIcon>
					</InputAdornment>
				)
			}}>
			{categorias.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}

SelectInput.propTypes = {
    state: PropTypes.objectOf(PropTypes.any),
    setState: PropTypes.func,
    loading: PropTypes.bool,
	width: PropTypes.string,
	fullWidth: PropTypes.bool
};

SelectInput.defaultProps = {
    state: {},
    setState: () => {},
    loading: false
};
