import * as type from "../types";

const initialState = {
	products: []
};

export default function Products(state = initialState, action) {
	switch (action.type) {
		case type.GET_PRODUCTS_SUCCESS:{
			return {
				products: [...action.products]
			}}
		default:
			return state;
	}
}
