import React from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://62a75d89bedc4ca6d7c7c8ee.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setisLoading(false);
      });
      window.scrollTo(0, 0);
  }, []);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
