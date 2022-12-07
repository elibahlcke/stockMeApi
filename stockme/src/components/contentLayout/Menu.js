import { Tabs, Tab } from "@mui/material";
import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

function useRouteMatch(patterns) {
	const { pathname } = useLocation();

	for (let i = 0; i < patterns.length; i += 1) {
		const pattern = patterns[i];
		const possibleMatch = matchPath(pattern, pathname);
		if (possibleMatch !== null) {
			return possibleMatch;
		}
	}

	return null;
}
function MyTabs() {
	const routeMatch = useRouteMatch(["/productos", "/entradas", "/salidas"]);
	const currentTab = routeMatch?.pattern?.path;

	return (
		<Tabs value={currentTab} orientation="vertical" indicatorColor="secondary">
			<Tab
				label="Productos"
				value="/productos"
				to="/productos"
				component={Link}
			/>
			<Tab label="Entradas" value="/entradas" to="/entradas" component={Link} />
			<Tab label="Salidas" value="/salidas" to="/salidas" component={Link} />
		</Tabs>
	);
}

export default function Menu() {
	return (
		<>
			<MyTabs />
		</>
	);
}
