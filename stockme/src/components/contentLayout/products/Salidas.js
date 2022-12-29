
import React from "react";

import {
	getHistorial,
	removeStock,
	findDeleted,
	findDeletedByDate
} from "../../../redux/Actions/salidas";
import HistorialComp from "../../common/HistorialComp";

const Salidas = () => {
	const historialProps = {
		getHistorial,
		findHistoryItem: findDeleted,
		findByDate:findDeletedByDate,
		handleStock: removeStock,
		origin:"salidas"
	};
	return (
		<>
			<HistorialComp {...historialProps} />
		</>
	);
};

export default Salidas;
