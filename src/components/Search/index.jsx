import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { searchContext } from '../../App';
import styles from './Search.module.scss';

export const Search = () => {
	const [value, setValue] = useState('');

	const { searchValue, setSearchValue } = useContext(searchContext);
	const inputRef = useRef();
	const updateSearchValue = useCallback(
		debounce((str) => {
			setSearchValue(str);
		}, 500),
		[],
	);
	const onClickClose = () => {
		setSearchValue('');
		setValue('');
		inputRef.current.focus();
	};
	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				enableBackground='new 0 0 24 24'
				id='Layer_1'
				version='1.0'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g>
					<g>
						<path d='M9,4c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S6.2,4,9,4 M9,2C5.1,2,2,5.1,2,9c0,3.9,3.1,7,7,7s7-3.1,7-7C16,5.1,12.9,2,9,2    L9,2z' />
					</g>
				</g>
				<g>
					<polygon points='22,20.3 20.3,22 14,15.7 14,14 15.7,14  ' />
					<rect
						height='3.6'
						transform='matrix(0.7071 -0.7071 0.7071 0.7071 -5.9741 14.4227)'
						width='1.2'
						x='13.8'
						y='12.6'
					/>
				</g>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пицци...'
			/>
			{searchValue && (
				<img
					onClick={onClickClose}
					className={styles.clearSearch}
					src='/icons8-close.svg'
					alt='close'
				/>
			)}
		</div>
	);
};
