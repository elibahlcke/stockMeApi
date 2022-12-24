import { toast } from "react-toastify";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const apiUrl = `http://localhost:8000/productos`;

function getApi(url = apiUrl) {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((response) => response.json())
		.catch((error) => {
			throw error;
		});
}

function postApi(data, method, url) {
	return fetch(url, {
		method: method,
		headers: {
			"Content-Type": "application/json"
		},
		body: data
	})
		.then((response) => response.json())
		.catch((error) => {
			throw error;
		});
}
const toastMessage = (type, message) => {
	if (type === "error") return toast.error(message || "Unable to get products");
	return toast.success(message || "Info actualizada con exito");
};
function* fetchProducts(action) {
	try {
		const products = yield call(getApi);
		yield put({ type: "GET_PRODUCTS_SUCCESS", products: products });
		yield call(action.onSuccess);
	} catch (e) {
		yield call(toastMessage, "error");
		yield call(action.onError);
	}
}

function* productsSaga() {
	yield takeEvery("GET_PRODUCTS", fetchProducts);
}

export function* filterProductsSaga() {
	yield takeLatest(
		"GET_FILTER_PRODUCTS",
		function* fetchFilterProducts(action) {
			try {
				const products = yield call(
					postApi,
					JSON.stringify({ value: action.value }),
					"POST",
					apiUrl
				);
				yield put({ type: "GET_FILTER_PRODUCTS_SUCCESS", products: products });
				yield call(action.onSuccess);
			} catch (e) {
				yield call(toastMessage, "error", "Unable to get filtered products");
				yield call(action.onError);
			}
		}
	);
}

export function* findProductSaga() {
	yield takeLatest("GET_FIND_PRODUCT", function* fetchFindProduct(action) {
		try {
			const product = yield call(
				postApi,
				JSON.stringify({ value: action.value }),
				"POST",
				`${apiUrl}/find`
			);
			yield put({ type: "GET_FIND_PRODUCT_SUCCESS", products: product });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to find products");
			yield call(action.onError);
		}
	});
}

export function* postProductSaga() {
	yield takeLatest("POST_PRODUCT", function* fetchPostProduct(action) {
		try {
			yield call(
				postApi,
				JSON.stringify(action.product),
				"POST",
				`${apiUrl}/add`
			);
			yield call(toastMessage, "success", "Producto agregado exitosamente");
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to add new product");
			yield call(action.onError);
		}
	});
}

export function* updateProductSaga() {
	yield takeLatest("UPDATE_PRODUCT", function* fetchUpdateProduct(action) {
		try {
			const product = yield call(
				postApi,
				JSON.stringify(action.data),
				"POST",
				`${apiUrl}/producto`
			);
			yield put({ type: "UPDATE_PRODUCT_SUCCESS", products: product });
			yield call(toastMessage, "success", "Producto actualizado correctamente");
			yield call(action.onSuccess);
		} catch (e) {
			console.log(e);
			yield call(toastMessage, "error", "Unable to update product");
			yield call(action.onError);
		}
	});
}

export function* deleteProductSaga() {
	yield takeLatest("DELETE_PRODUCT", function* fetchDeleteProduct(action) {
		try {
			const product = yield call(
				postApi,
				JSON.stringify({ products: action.products }),
				"POST",
				`${apiUrl}/delete`
			);
			yield put({ type: "DELETE_PRODUCT_SUCCESS", products: product });
			yield call(toastMessage, "success", "Producto borrado exitosamente");
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to delete product");
			yield call(action.onError);
		}
	});
}

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
			const product = yield call(
				getApi,
				`${apiUrl}/historial`
			);
			yield put({ type: "GET_HISTORIAL_SUCCESS", products: product });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastMessage, "error", "Unable to get historial");
			yield call(action.onError);
		}
	});
}
export default productsSaga;
