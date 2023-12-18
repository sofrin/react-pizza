import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { RootState } from '../store';

export type CartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	size: number;
	type: string;
	count: number;
};

export interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}
const cartData = getCartFromLocalStorage();
const initialState: CartSliceState = {
	totalPrice: cartData.totalPrice,
	items: cartData.items,
};
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
				state.totalPrice = calcTotalPrice(state.items);
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
		},

		plusMinus(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
				state.totalPrice = state.totalPrice - findItem.price;
			}
		},
		removeItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				state.totalPrice = state.totalPrice - findItem.price;
			}
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});
export const selectCart = (state: RootState) => state.cart;
export const { addItem, removeItem, clearItems, plusMinus } = cartSlice.actions;
export default cartSlice.reducer;
