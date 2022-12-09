import * as type from '../types';

export const getProducts = () =>  ({type: type.GET_PRODUCTS});
export const getProductsSuccess = (products) => ({type: type.GET_PRODUCTS_SUCCESS, products})
