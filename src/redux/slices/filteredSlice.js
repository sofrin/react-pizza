import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPage: 1,
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
};
const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setFilters(state, action) {
			state.currentPage = action.payload.currentPage;
			state.sort = action.payload.sort;
			state.categoryId = action.payload.categoryId;
		},
	},
});
export const { setCategoryId, setSort, setCurrentPage, setFilters } =
	filterSlice.actions;
export default filterSlice.reducer;
