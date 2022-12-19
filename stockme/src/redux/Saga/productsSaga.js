import { toast } from "react-toastify";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const apiUrl = `http://localhost:8000/productos`;

function getApi() {
	return fetch(apiUrl, {
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

function postApi(data, url) {
	return fetch(url, {
		method: "POST",
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
const toastError = (message) => {
	toast.error(message || "Unable to get products");
};
function* fetchProducts(action) {
	try {
		const products = yield call(getApi);
		yield put({ type: "GET_PRODUCTS_SUCCESS", products: products });
		yield call(action.onSuccess);
	} catch (e) {
		yield call(toastError);
		yield call(action.onError);
	}
}

function* productsSaga() {
	yield takeEvery("GET_PRODUCTS", fetchProducts);
}

export function* filterProductsSaga() {
	yield takeLatest("GET_FILTER_PRODUCTS", function* fetchFilterProducts(action) {
		try {
			const products = yield call(postApi, JSON.stringify({value: action.value}), apiUrl);
			yield put({ type: "GET_FILTER_PRODUCTS_SUCCESS", products: products });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastError("Unable to get filtered products"));
			yield call(action.onError);
		}
	});
}

export function* findProductSaga() {
	yield takeLatest("GET_FIND_PRODUCT", function* fetchFindProduct(action) {
		try {
			const product = yield call(postApi, JSON.stringify({value: action.value}), `${apiUrl}/find`);
			yield put({ type: "GET_FIND_PRODUCT_SUCCESS", products: product });
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastError("Unable to find products"));
			yield call(action.onError);
		}
	})
}

export function* postProductSaga() {
	yield takeLatest("POST_PRODUCT", function* fetchPostProduct(action) {
		try {
			const product = yield call(postApi,action.product, `${apiUrl}/add`  );
			yield put({type: "POST_PRODUCT_SUCCESS", products: product});
			yield call(action.onSuccess);
		} catch (e) {
			yield call(toastError("Unable to add new product"));
			yield call(action.onError)
		}
	})
}
export default productsSaga;
