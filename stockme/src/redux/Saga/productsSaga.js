import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects'

const apiUrl = `http://localhost:8000/productos`;
function getApi() {
  return fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',

      }
  }).then(response => response.json())
    .catch((error) => {throw error})
}
const toastError = () => {
   toast.error("Unable to get products")
}
function* fetchProducts() {
   try {
      const products = yield call(getApi);
      yield put({type: 'GET_PRODUCTS_SUCCESS', products: products});
   } catch (e) {
      yield call(toastError);
   }
}

function* productsSaga() {
   yield takeEvery('GET_PRODUCTS', fetchProducts);
}

export default productsSaga;