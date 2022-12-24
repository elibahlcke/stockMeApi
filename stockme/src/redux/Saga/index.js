import { all } from "redux-saga/effects";
import productsSaga, {
	filterProductsSaga,
	findProductSaga,
	postProductSaga,
	updateProductSaga,
	deleteProductSaga,
	removeStockSaga,
	getHistorialSaga
} from "./productsSaga";

export default function* rootSaga() {
	yield all([
		filterProductsSaga(),
		findProductSaga(),
		postProductSaga(),
		productsSaga(),
		updateProductSaga(),
		deleteProductSaga(),
		removeStockSaga(),
		getHistorialSaga()
	]);
}
