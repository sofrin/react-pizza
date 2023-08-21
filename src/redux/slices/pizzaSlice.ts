import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type SeatchPizzaParams = {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: string;
};
type PizzaItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};

interface PizzaSliceState {
	items: PizzaItem[];
	status: 'loading' | 'success' | 'error';
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SeatchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { order, sortBy, category, search, currentPage } = params;
		const { data } = await axios.get<PizzaItem[]>(
			`https://62a75d89bedc4ca6d7c7c8ee.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		);
		return data;
	},
);
const initialState: PizzaSliceState = {
	items: [],
	status: 'loading',
};
const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = 'loading';
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = 'error';
			state.items = [];
		});
	},

	// extraReducers: {
	// 	[fetchPizzas.pending]: (state) => {
	// 		state.status = 'loading';
	// 		state.items = [];
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload;
	// 		state.status = 'succes';
	// 	},
	// 	[fetchPizzas.rejected]: (state) => {
	// 		state.status = 'error';
	// 		state.items = [];
	// 	},
	// },
});
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
