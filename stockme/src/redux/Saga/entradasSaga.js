import { call, put, takeLatest } from "redux-saga/effects";
import { getApi, postApi, toastMessage, apiUrl } from "./productsSaga";

export function* addStockSaga() {
	yield takeLatest("ADD_STOCK", function* fetchAddStock(action) {
		try {
			const product = yield call(
				postApi,
				JSON.stringify(action.data),
				"POST",
				`${apiUrl}/entrada`
			);
			yield put({ type: "ADD_STOCK_SUCCESS", products: product });
			yield call(toastMessage, "success", "Stock agregado exitosamente");
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to add stock");
			yield call(action.onError);
		}
	});
}

export function* getHistorialEntradasSaga() {
	yield takeLatest("GET_HISTORIAL_ENTRADAS", function* fetchGetHistorialEntradas(action) {
		try {
			const product = yield call(getApi, `${apiUrl}/entradas`);
			yield put({ type: "GET_HISTORIAL_ENTRADAS_SUCCESS", products: product });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to get historial de entradas");
			yield call(action.onError);
		}
	});
}

export function* findEntradasSaga() {
	yield takeLatest("FIND_ENTRADAS", function* fetchEntradas(action) {
		try {
			const product = yield call(
				postApi,
				JSON.stringify({ value: action.value }),
				"POST",
				`${apiUrl}/entradas`
			);
			yield put({ type: "FIND_ENTRADAS_SUCCESS", products: product });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to get entradas");
			yield call(action.onError);
		}
	});
}
export function* findEntradasByDateSaga() {
	yield takeLatest("FIND_ENTRADAS_BYDATE", function* fetchEntradasByDate(action) {
		try {
			const product = yield call(
				postApi,
				JSON.stringify(action.data),
				"POST",
				`${apiUrl}/entryDates`
			);
			yield put({ type: "FIND_ENTRADAS_BYDATE_SUCCESS", products: product });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to get products");
			yield call(action.onError);
		}
	});
}
