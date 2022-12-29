
import React from "react";

import {
	getHistorialEntradas,
	addStock,
	findEntradas,
	findEntradasByDate
} from "../../../redux/Actions/entradas";
import HistorialComp from "../../common/HistorialComp";

const Entradas = () => {
	const historialProps = {
		getHistorial: getHistorialEntradas,
		findHistoryItem: findEntradas,
		findByDate:findEntradasByDate,
		handleStock: addStock,
		origin:"entradas"
	};
	return (
		<>
			<HistorialComp {...historialProps} />
		</>
	);
};

export default Entradas;
