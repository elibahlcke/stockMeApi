import { all } from 'redux-saga/effects'
import productsSaga, {filterProductsSaga, findProductSaga, postProductSaga} from './productsSaga'

export default function* rootSaga() {
  yield all([
    filterProductsSaga(),
    findProductSaga(),
    postProductSaga(),
    productsSaga(),

  ])
}