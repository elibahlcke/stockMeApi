import * as type from "../types";

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

export const findDeleted = (value, onSuccess, onError) => ({ 
	type: type.FIND_DELETED,
	value,
	onSuccess,
	onError	
})
export const findDeletedSuccess = (products) => ({ 
	type: type.FIND_DELETED_SUCCESS,
	products
})

export const findDeletedByDate = (data, onSuccess, onError) => ({ 
	type: type.FIND_DELETED_BYDATE,
	data,
	onSuccess,
	onError	
})
export const findDeletedByDateSuccess = (products) => ({ 
	type: type.FIND_DELETED_BYDATE_SUCCESS,
	products
})
