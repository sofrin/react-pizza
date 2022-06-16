import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch('https://62a75d89bedc4ca6d7c7c8ee.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((arr) => setItems(arr));
  }, []);

  return (
    <div className='wrapper'>
      <Header />

      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
