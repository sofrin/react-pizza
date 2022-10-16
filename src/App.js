import './scss/app.scss';

import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

const searchContext = createContext('');

function App() {
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className='wrapper'>
			<searchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route
							path='/'
							element={<Home />}
						/>
						<Route
							path='/cart'
							element={<Cart />}
						/>
						<Route
							path='*'
							element={<NotFound />}
						/>
					</Routes>
				</div>
			</searchContext.Provider>
		</div>
	);
}

export default App;
