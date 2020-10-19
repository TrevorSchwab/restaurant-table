import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import RestaurantTable from './components/RestaurantTable';
import Pagination from './components/Pagination';
import './App.css';

type restaurant = {
  address1: string;
  attire: string;
  city: string;
  genre: string;
  hours: string;
  id: string;
  lat: string;
  long: string;
  name: string;
  state: string;
  tags: string;
  telephone: string;
  website: string;
  zip: string;
};

const App = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [state, setState] = useState('all');
  const [genre, setGenre] = useState('all');
  const [attire, setAttire] = useState('all');

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      const response = await fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
        headers: {
          Authorization: 'Api-Key q3MNxtfep8Gt',
        },
      });

      const restaurants = await response.json();
      const sortAToZ = restaurants.sort((restaurantA: restaurant, restaurantB: restaurant) =>
        restaurantA.name.localeCompare(restaurantB.name)
      );
      setRestaurantData(sortAToZ);
      setLoading(false);
    };
    fetchRestaurants();
  }, []);

  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      id: string;
      value: string;
      name: string;
      Search: { value: string };
    };

    if (target.id === 'onChangeSearch') {
      if (target.value === '') {
        setSearch(target.value);
      }
      return;
    }

    target.name === 'Search' && setSearch(target.Search.value);
    target.name === 'State' && setState(target.value);
    target.name === 'Genre' && setGenre(target.value);
    target.name === 'Attire' && setAttire(target.value);
  };

  const filteredRestaurants = restaurantData.filter((restaurant: restaurant) => {
    const filteredSearch =
      restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.city.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.genre.toLowerCase().includes(search.toLowerCase()) ||
      search === '';

    const filteredState =
      state.includes('all') || restaurant.state.toLowerCase().includes(state.toLowerCase());

    const filteredGenre =
      genre.includes('all') || restaurant.genre.toLowerCase().includes(genre.toLowerCase());

    const filteredAttire =
      attire.includes('all') ||
      restaurant.attire.replace(/\s/g, '').toLowerCase() ===
        attire.replace(/\s/g, '').toLowerCase();

    return filteredSearch && filteredState && filteredGenre && filteredAttire;
  });

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const paginate = (e: React.SyntheticEvent, pageNumber: number) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Header handleChange={handleChange} />
      <RestaurantTable loading={loading} currentRestaurants={currentRestaurants} />
      <Pagination
        totalRestaurants={filteredRestaurants.length}
        restaurantsPerPage={restaurantsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
