import { toast } from "react-toastify";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

export const apiUrl = `http://localhost:8000/productos`;

export function getApi(url = apiUrl) {
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

export function postApi(data, method, url) {
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
export const toastMessage = (type, message) => {
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




export default productsSaga;
