import * as type from "../types";

export const addStock = (data, onSuccess, onError) => ({
	type: type.ADD_STOCK,
	data,
	onSuccess,
	onError
});
export const addStockSuccess = (products) => ({
	type: type.ADD_STOCK_SUCCESS,
	products
});

export const getHistorialEntradas = (onSuccess, onError) => ({ 
	type: type.GET_HISTORIAL_ENTRADAS,
	onSuccess,
	onError	
})
export const getHistorialEntradasSuccess = (products, onSuccess, onError) => ({ 
	type: type.GET_HISTORIAL_ENTRADAS_SUCCESS,
	products,
	onSuccess,
	onError	
})

export const findEntradas = (value, onSuccess, onError) => ({ 
	type: type.FIND_ENTRADAS,
	value,
	onSuccess,
	onError	
})
export const findEntradasSuccess = (products) => ({ 
	type: type.FIND_ENTRADAS_SUCCESS,
	products
})

export const findEntradasByDate = (data, onSuccess, onError) => ({ 
	type: type.FIND_ENTRADAS_BYDATE,
	data,
	onSuccess,
	onError	
})
export const findEntradasByDateSuccess = (products) => ({ 
	type: type.FIND_ENTRADAS_BYDATE_SUCCESS,
	products
})
