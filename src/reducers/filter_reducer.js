import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_PRODUCTS:
			let allPrice = action.payload.map(item => {
				return item.price;
			});
			const maxPrice = Math.max(...allPrice);
			return {
				...state,
				all_products: [...action.payload],
				filtered_products: [...action.payload],
				filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
			};
		case SET_GRIDVIEW:
			return { ...state, grid_view: true };
		case SET_LISTVIEW:
			return { ...state, grid_view: false };
		case UPDATE_SORT:
			return { ...state, sort: action.payload };
		case SORT_PRODUCTS:
			const { sort, filtered_products } = state;
			let sorted_products = [...filtered_products];
			switch (sort) {
				case 'price-lowest':
					// console.log('price-lowest');
					sorted_products = sorted_products.sort((a, b) => {
						return a.price > b.price ? 1 : -1;
					});
					break;
				case 'price-highest':
					// console.log('price-highest');
					sorted_products = sorted_products.sort((a, b) => {
						return a.price > b.price ? -1 : 1;
					});
					break;
				case 'name-a':
					// console.log('name-z');
					sorted_products = sorted_products.sort((a, b) => {
						return a.name > b.name ? 1 : -1;
					});
					break;
				case 'name-z':
					// console.log('name-a');
					sorted_products = sorted_products.sort((a, b) => {
						return a.name > b.name ? -1 : 1;
					});
					break;
				default:
					console.log('No match!');
					break;
			}
			return { ...state, filtered_products: sorted_products };
		case UPDATE_FILTERS:
			const { name, value } = action.payload;
			return { ...state, filters: { ...state.filters, [name]: value } };
		case FILTER_PRODUCTS:
			console.log(' we are filtering products...');
			const { all_products } = state;
			const { text, category, color, company, price, shipping } = state.filters;

			let temp_products = [...all_products];
			if (text) {
				temp_products = temp_products.filter(product => {
					return product.name.toLowerCase().includes(text);
				});
			}
			if (category !== 'all') {
				temp_products = temp_products.filter(
					product => product.category === category,
				);
			}
			if (company !== 'all') {
				temp_products = temp_products.filter(
					product => product.company === company,
				);
			}
			if (color !== 'all') {
				temp_products = temp_products.filter(product => {
					return product.colors.find(c => c === color);
				});
			}
			if (price) {
				temp_products = temp_products.filter(product => product.price <= price);
			}
			if (shipping) {
				temp_products = temp_products.filter(
					product => product.shipping === true,
				);
			}
			return { ...state, filtered_products: temp_products };
		case CLEAR_FILTERS:
			return {
				...state,
				filters: {
					...state.filters,
					text: '',
					company: 'all',
					category: 'all',
					color: 'all',
					price: state.filters.max_price,
					shipping: false,
				},
			};
		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;
