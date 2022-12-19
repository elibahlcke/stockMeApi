import { all } from 'redux-saga/effects'
import productsSaga, {filterProductsSaga, findProductSaga} from './productsSaga'

export default function* rootSaga() {
  yield all([
    filterProductsSaga(),
    findProductSaga(),
    productsSaga(),

  ])
}