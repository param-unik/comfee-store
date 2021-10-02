import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_SINGLE_PRODUCT_BEGIN,
	GET_SINGLE_PRODUCT_SUCCESS,
	GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const products_reducer = (state, action) => {
	switch (action.type) {
		case SIDEBAR_OPEN:
			return { ...state, isSidebarOpen: true };
		case SIDEBAR_CLOSE:
			return { ...state, isSidebarOpen: false };
		case GET_PRODUCTS_BEGIN:
			return { ...state, products_loading: true };
		case GET_PRODUCTS_SUCCESS:
			const products_featured = action.payload.filter(
				product => product.featured === true,
			);
			return {
				...state,
				products_loading: false,
				products_error: false,
				products: action.payload,
				products_featured,
			};
		case GET_PRODUCTS_ERROR:
			return { ...state, products_error: true, products_loading: false };
		case GET_SINGLE_PRODUCT_BEGIN:
			return { ...state, product_loading: true, product_error: false };
		case GET_SINGLE_PRODUCT_SUCCESS:
			return {
				...state,
				product_loading: false,
				product_error: false,
				product: action.payload,
			};
		case GET_SINGLE_PRODUCT_ERROR:
			return { ...state, product_error: true, product_loading: false };
		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default products_reducer;
