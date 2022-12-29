import { all } from "redux-saga/effects";
import productsSaga, {
	filterProductsSaga,
	findProductSaga,
	postProductSaga,
	updateProductSaga,
	deleteProductSaga
} from "./productsSaga";
import {
	removeStockSaga,
	getHistorialSaga,
	findDeletedSaga,
	findDeletedByDateSaga
} from "./salidasSaga";
import {
	addStockSaga,
	findEntradasByDateSaga,
	findEntradasSaga,
	getHistorialEntradasSaga
} from "./entradasSaga";

export default function* rootSaga() {
	yield all([
		filterProductsSaga(),
		findProductSaga(),
		postProductSaga(),
		productsSaga(),
		updateProductSaga(),
		deleteProductSaga(),
		removeStockSaga(),
		getHistorialSaga(),
		findDeletedSaga(),
		findDeletedByDateSaga(),
		addStockSaga(),
		getHistorialEntradasSaga(),
		findEntradasSaga(),
		findEntradasByDateSaga()
	]);
}
