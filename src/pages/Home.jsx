import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import { Pagination } from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Search } from '../components/Search';
import Sort, { sortList } from '../components/Sort';
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filteredSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const { categoryId, sort, currentPage, searchValue } = useSelector(
		(state) => state.filter,
	);
	const { items, status } = useSelector((state) => state.pizza);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};
	const onChangePage = (number) => dispatch(setCurrentPage(number));

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
		const getPizzas = async () => {
			const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
			const sortBy = sort.sortProperty.replace('-', '');
			const category = categoryId > 0 ? `category=${categoryId}` : '';
			const search = searchValue ? `&search=${searchValue}` : '';

			dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }));
		};
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage, dispatch]);
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				searchValue,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
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
				{status === 'loading'
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj) => (
							<Link
								key={obj.id}
								to={`/pizza/${obj.id}`}
							>
								<PizzaBlock {...obj} />
							</Link>
					  ))}
			</div>
			<Pagination
				currentPage={currentPage}
				onChangePage={onChangePage}
			/>
		</div>
	);
};
