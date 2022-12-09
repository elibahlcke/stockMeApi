import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { lazy, Suspense } from "react";
import Login from "./Login";
import AppHeader from "./components/appheader/Index";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLogin } from "./components/common/hooks";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mui/material";
import Menu from "./components/contentLayout/Menu";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1836b2",
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
				root: { color: "#1836b2" }
			}
		},
		MuiTab: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: "#1836b2",
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

const Products = lazy(() =>
	import("./components/contentLayout/products/Index")
);
const Entradas = lazy(() =>
	import("./components/contentLayout/products/Entradas")
);
const Salidas = lazy(() =>
	import("./components/contentLayout/products/Salidas")
);

function App() {
	const { token, getToken } = useLogin();

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<ToastContainer />
				<AppHeader />
				{token ? (
					<BrowserRouter>
						<Grid
							container
							justifyContent="space-between"
							spacing={2}
							className="page-content"
							sx={{ height: "100vh" }}>
							<Grid item container xs={2}>
								<Menu />
							</Grid>
							<Grid item container xs={10} className="body-content">
								<Suspense fallback={<div>Loading...</div>}>
									<Routes>
										<Route path="/" element={<Products />} />
										<Route index element={<Products />} />
										<Route path="/productos" element={<Products />} />
										<Route path="/entradas" element={<Entradas />} />
										<Route path="/salidas" element={<Salidas />} />
										<Route path="*" element={<h1>notfound</h1>} />
									</Routes>
								</Suspense>
							</Grid>
						</Grid>
					</BrowserRouter>
				) : (
					<Login getToken={getToken} />
				)}
			</div>
		</ThemeProvider>
	);
}

export default App;
