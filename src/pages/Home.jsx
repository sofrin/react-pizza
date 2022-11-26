import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { searchContext } from '../App';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Search } from '../components/Search';
import Sort from '../components/Sort';

import { setCategoryId } from '../redux/slices/filteredSlice';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { categoryId, sort } = useSelector((state) => state.filter);

	const [items, setItems] = useState([]);
	const [isLoading, setisLoading] = useState(true);

	const { searchValue } = useContext(searchContext);
	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	useEffect(() => {
		const controller = new AbortController();
		setisLoading(true);
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		axios
			.get(
				`https://62a75d89bedc4ca6d7c7c8ee.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
				{
					signal: controller.signal,
				},
			)
			.then((res) => {
				setItems(res.data);
				setisLoading(false);
			});
		window.scrollTo(0, 0);
		return () => {
			controller.abort();
		};
	}, [categoryId, sort.sortProperty, searchValue]);
	useEffect(() => {
		const queryString = qs.stringify({
			sortProperty: sort.sortProperty,
			categoryId,
			searchValue,
		});
		navigate(`?${queryString}`);
	}, [categoryId, sort.sortProperty, searchValue, navigate]);
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={onChangeCategory}
				/>
				<Sort />
			</div>
			<div className='content__header__wrapper'>
				<h2 className='content__title'>Все пиццы</h2>
				<Search />
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
