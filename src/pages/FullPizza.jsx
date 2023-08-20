import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FullPizza = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [pizza, setPazza] = useState();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://62a75d89bedc4ca6d7c7c8ee.mockapi.io/items/` + id,
				);
				setPazza(data);
			} catch (error) {
				alert('Ошибка при получении пиццы');
				navigate('/');
			}
		}
		fetchPizza();
	}, [id, navigate]);
	if (!pizza) {
		return <div>Загрузка...</div>;
	}
	return (
		<div className='container'>
			<img
				src={pizza.imageUrl}
				alt='пица'
			/>
			<h2>{pizza.title}</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
				voluptates?
			</p>
			<span>{pizza.price}</span>
		</div>
	);
};
