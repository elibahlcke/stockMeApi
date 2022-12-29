import { call, put, takeLatest } from "redux-saga/effects";
import { getApi, postApi, toastMessage, apiUrl } from "./productsSaga";

export function* removeStockSaga() {
	yield takeLatest("REMOVE_STOCK", function* fetchRemoveStock(action) {
		try {
			const product = yield call(
				postApi,
				JSON.stringify(action.data),
				"POST",
				`${apiUrl}/remove`
			);
			yield put({ type: "REMOVE_STOCK_SUCCESS", products: product });
			yield call(toastMessage, "success", "Stock descontado exitosamente");
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to remove product");
			yield call(action.onError);
		}
	});
}

export function* getHistorialSaga() {
	yield takeLatest("GET_HISTORIAL", function* fetchGetHistorial(action) {
		try {
			const product = yield call(getApi, `${apiUrl}/historial`);
			yield put({ type: "GET_HISTORIAL_SUCCESS", products: product });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to get historial");
			yield call(action.onError);
		}
	});
}

export function* findDeletedSaga() {
	yield takeLatest("FIND_DELETED", function* fetchDeleted(action) {
		try {
			const product = yield call(
				postApi,
				JSON.stringify({ value: action.value }),
				"POST",
				`${apiUrl}/findDeleted`
			);
			yield put({ type: "FIND_DELETED_SUCCESS", products: product });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to get history");
			yield call(action.onError);
		}
	});
}
export function* findDeletedByDateSaga() {
	yield takeLatest("FIND_DELETED_BYDATE", function* fetchDeletedByDate(action) {
		try {
			const product = yield call(
				postApi,
				JSON.stringify(action.data),
				"POST",
				`${apiUrl}/historial`
			);
			yield put({ type: "FIND_DELETED_BYDATE_SUCCESS", products: product });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to get history");
			yield call(action.onError);
		}
	});
}
