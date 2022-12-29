import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ToastContainer } from "react-toastify";
import React, { lazy, Suspense } from "react";
import Login from "./Login";
import AppHeader from "./components/appheader/Index";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Context, useLoading, useLogin } from "./components/common/hooks";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mui/material";
import Menu from "./components/contentLayout/Menu";
import Products from "./components/contentLayout/products/Products";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ffcb23",
			light: "#68708e"
		},
		secondary: {
			main: "#7E7E7E",
			light: "#C1C1C1"
		}
	},
	components: {
		// Name of the component
		MuiTextField: {
			styleOverrides: {
				root: { color: "#ffcb23" }
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: "#7e7e7e"
				}
			}
		},
		MuiTab: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: "#ffcb23",
						color: "#fff",
						fontWeight: "bold"
					}
				}
			}
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					"& .MuiTabs-indicator": {
						display: "none"
					}
				}
			}
		}
	}
});
const EntradaMuchos = lazy(() =>
	import("./components/contentLayout/products/EntradaMuchos")
);
const Salidas = lazy(() =>
	import("./components/contentLayout/products/Salidas")
);

function App() {
	const { token, getToken } = useLogin();
	const { loading, Loading, actions } = useLoading();
	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<div className="App">
					<ToastContainer />
					{loading && <Loading />}
					<AppHeader />
					{token ? (
						<BrowserRouter>
							<Context.Provider value={{ loading, actions }}>
								<Grid
									container
									justifyContent="space-between"
									spacing={2}
									className="page-content"
									sx={{ height: "100vh", mt: 2 }}>
									<Grid item container xs={2}>
										<Menu />
									</Grid>
									<Grid item container xs={10} className="body-content">
										<Suspense fallback={<div>Loading...</div>}>
											<Routes>
												<Route path="/" element={<Products />} />
												<Route index element={<Products />} />
												<Route path="/productos" element={<Products />} />
												<Route path="/entradas" element={<EntradaMuchos />} />
												<Route path="/salidas" element={<Salidas />} />
												<Route path="*" element={<h1>notfound</h1>} />
											</Routes>
										</Suspense>
									</Grid>
								</Grid>
							</Context.Provider>
						</BrowserRouter>
					) : (
						<Login getToken={getToken} />
					)}
				</div>
			</LocalizationProvider>
		</ThemeProvider>
	);
}

export default App;
