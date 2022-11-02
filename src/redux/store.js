import { configureStore } from '@reduxjs/toolkit';

import filter from './slices/filteredSlice';

export const store = configureStore({
	reducer: { filter },
});
