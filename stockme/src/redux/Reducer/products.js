import * as type from "../types";

const initialState = {
	products: []
};

export default function Products(state = initialState, action) {
	switch (action.type) {
		case type.GET_FILTER_PRODUCTS_SUCCESS:
		case type.GET_FIND_PRODUCT_SUCCESS:
		case type.POST_PRODUCT_SUCCESS:
		case type.GET_PRODUCTS_SUCCESS: {
			return {
				products: [...action.products]
			};
		}

		default:
			return state;
	}
}
