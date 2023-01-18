import axios from 'axios';
import qs from 'qs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { searchContext } from '../App';
import Categories from '../components/Categories';
import { Pagination } from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Search } from '../components/Search';
import Sort, { sortList } from '../components/Sort';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filteredSlice';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const { categoryId, sort, currentPage } = useSelector(
		(state) => state.filter,
	);

	const [items, setItems] = useState([]);
	const [isLoading, setisLoading] = useState(true);

	const { searchValue } = useContext(searchContext);
	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};
	const onChangePage = (number) => dispatch(setCurrentPage(number));
	const fetchPizzas = () => {
		const controller = new AbortController();
		setisLoading(true);
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		axios
			.get(
				`https://62a75d89bedc4ca6d7c7c8ee.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
				{
					signal: controller.signal,
				},
			)
			.then((res) => {
				setItems(res.data);
				setisLoading(false);
			});

		return () => {
			controller.abort();
		};
	};
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty,
			);
			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, [dispatch, isSearch]);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);
	useEffect(() => {
		const queryString = qs.stringify({
			sortProperty: sort.sortProperty,
			categoryId,
			searchValue,
			currentPage,
		});
		navigate(`?${queryString}`);
	}, [categoryId, sort.sortProperty, searchValue, navigate, currentPage]);
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
			<Pagination
				currentPage={currentPage}
				onChangePage={onChangePage}
			/>
		</div>
	);
};
