import React from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Search } from '../components/Search';
import Sort from '../components/Sort';

export const Home = () => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setisLoading] = React.useState(true);
	const [searchValue, setSearchValue] = React.useState('');
	const [sortType, setSortType] = React.useState({
		name: 'популярности',
		sortProperty: 'rating',
	});
	const [categoryId, setCategoryId] = React.useState(0);

	React.useEffect(() => {
		setisLoading(true);
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sortType.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		fetch(
			`https://62a75d89bedc4ca6d7c7c8ee.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
		)
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr);
				setisLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue]);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={(i) => setCategoryId(i)}
				/>
				<Sort
					value={sortType}
					onChangeSort={(i) => setSortType(i)}
				/>
			</div>
			<div className='content__header__wrapper'>
				<h2 className='content__title'>Все пиццы</h2>
				<Search
					searchValue={searchValue}
					setSearchValue={setSearchValue}
				/>
			</div>

			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj) => (
							<PizzaBlock
								key={obj.id}
								{...obj}
							/>
					  ))}
			</div>
		</div>
	);
};
