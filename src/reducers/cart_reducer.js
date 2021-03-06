import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const { id, color, amount, product } = action.payload;
			console.log('state' + state);
			const tempItem = state.cart.find(i => i.id === id + color);
			if (tempItem) {
				const tempCart = state.cart.map(cartItem => {
					if (cartItem.id === id + color) {
						let newAmount = cartItem.amount + amount;
						if (newAmount > cartItem.max) {
							newAmount = cartItem.max;
						}
						return { ...cartItem, amount: newAmount };
					} else {
						return cartItem;
					}
				});
				return { ...state, cart: tempCart };
			} else {
				const newItem = {
					id: id + color,
					name: product.name,
					color,
					amount,
					image: product.images[0].url,
					price: product.price,
					max: product.stock,
				};
				return { ...state, cart: [...state.cart, newItem] };
			}
		case REMOVE_CART_ITEM:
			const tempCart = state.cart.filter(item => item.id !== action.payload);
			return { ...state, cart: tempCart };
		case CLEAR_CART:
			return { ...state, cart: [] };
		case TOGGLE_CART_ITEM_AMOUNT:
			const { id: ID, value } = action.payload;
			const tempToggleCart = state.cart.map(item => {
				if (item.id === ID) {
					let newAmount;
					if (value === 'INC') {
						newAmount = item.amount + 1;
						newAmount = newAmount > item.max ? item.max : newAmount;
					}
					if (value === 'DEC') {
						newAmount = item.amount - 1;
						newAmount = newAmount < 1 ? 1 : newAmount;
					}
					return { ...item, amount: newAmount };
				} else {
					return item;
				}
			});
			return { ...state, cart: tempToggleCart };
		case COUNT_CART_TOTALS:
			const { total_items, total_amount } = state.cart.reduce(
				(total, cartItem) => {
					const { amount, price } = cartItem;
					total.total_items += amount;
					total.total_amount += price * amount;
					return total;
				},
				{
					total_items: 0,
					total_amount: 0,
				},
			);
			return { ...state, total_items, total_amount };
		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default cart_reducer;
