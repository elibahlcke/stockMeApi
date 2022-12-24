import * as type from "../types";

export const getProducts = (onSuccess, onError) => ({
	type: type.GET_PRODUCTS,
	onSuccess,
	onError
});
export const getProductsSuccess = (products) => ({
	type: type.GET_PRODUCTS_SUCCESS,
	products
});

export const getFilterProduct = (value, onSuccess, onError) => ({
	type: type.GET_FILTER_PRODUCTS,
	value,
	onSuccess,
	onError
});
export const getFilterProductSuccess = (products) => ({
	type: type.GET_FILTER_PRODUCTS_SUCCESS,
	products
});

export const findProduct = (value, onSuccess, onError) => ({
	type: type.GET_FIND_PRODUCT,
	value,
	onSuccess,
	onError
});
export const findProductSuccess = (products) => ({
	type: type.GET_FIND_PRODUCT_SUCCESS,
	products
});

export const postProduct = (product, onSuccess, onError) => ({
	type: type.POST_PRODUCT,
	product,
	onSuccess,
	onError
});
export const postProductSuccess = (products) => ({
	type: type.POST_PRODUCT_SUCCESS,
	products
});

export const updateProduct = (data, onSuccess, onError) => ({
	type: type.UPDATE_PRODUCT,
	data,
	onSuccess,
	onError
});
export const updateProductSuccess = (products) => ({
	type: type.UPDATE_PRODUCT_SUCCESS,
	products
});
export const deleteProducts = (products, onSuccess, onError) => ({
	type: type.DELETE_PRODUCT,
	products,
	onSuccess,
	onError
})
export const deleteProductsSuccess = (products) => ({
	type: type.DELETE_PRODUCT_SUCCESS,
	products
})
export const removeStock = (data, onSuccess, onError) => ({
	type: type.REMOVE_STOCK,
	data,
	onSuccess,
	onError
})
export const removeStockSuccess = (products) => ({
	type: type.REMOVE_STOCK_SUCCESS,
	products
})

export const getHistorial = (onSuccess, onError) => ({ 
	type: type.GET_HISTORIAL,
	onSuccess,
	onError	
})
export const getHistorialSuccess = (products, onSuccess, onError) => ({ 
	type: type.GET_HISTORIAL_SUCCESS,
	products,
	onSuccess,
	onError	
})

export const findHistory = () => ({})