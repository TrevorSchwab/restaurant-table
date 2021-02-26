import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import RestaurantTable from './components/RestaurantTable';
import Pagination from './components/Pagination';
import { RESTAURANTS_PER_PAGE } from './constants';
import './App.css';

type Restaurant = {
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
  const [search, setSearch] = useState('');
  const [state, setState] = useState('all');
  const [genre, setGenre] = useState('all');
  const [attire, setAttire] = useState('all');

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      const response = await fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
        headers: {
          Authorization: 'Api-Key q3MNxtfep8Gt', //prod: gitignored in an ENV variable
        },
      });

      const restaurants = await response.json();
      const sortAToZ = restaurants.sort((restaurantA: Restaurant, restaurantB: Restaurant) =>
        restaurantA.name.localeCompare(restaurantB.name)
      );
      setRestaurantData(sortAToZ);
      setLoading(false);
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, state, genre, attire]);

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      id: string;
      value: string;
      name: string;
      search: { value: string };
    };

    if (target.id === 'onChangeSearch') {
      if (target.value === '') {
        setSearch(target.value);
      }
      return;
    }

    setSearch(target.search.value);
  };

  const filteredRestaurants = restaurantData.filter((restaurant: Restaurant) => {
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

  const indexOfLastRestaurant = currentPage * RESTAURANTS_PER_PAGE;
  const indexOfFirstRestaurant = indexOfLastRestaurant - RESTAURANTS_PER_PAGE;
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
      <Header
        handleSearch={handleSearch}
        handleState={setState}
        handleGenre={setGenre}
        handleAttire={setAttire}
      />
      <RestaurantTable loading={loading} currentRestaurants={currentRestaurants} />
      <Pagination
        totalRestaurants={filteredRestaurants.length}
        restaurantsPerPage={RESTAURANTS_PER_PAGE}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
