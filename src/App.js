import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      const response = await fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
        headers: {
          Authorization: 'Api-Key q3MNxtfep8Gt',
        },
      });

      const restaurants = await response.json();
      const sortAToZ = restaurants.sort((a, b) => a.name.localeCompare(b.name));
      setRestaurantData(sortAToZ);
      setLoading(false);
    };
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === 'onChangeSearch') {
      if (e.target.value === '') {
        setSearch(e.target.value);
      }
      return;
    }
    e.target.name === 'Search' && setSearch(e.target.Search.value);
    e.target.name === 'State' && setState(e.target.value);
    e.target.name === 'Genre' && setGenre(e.target.value);
  };

  const filteredRestaurants = restaurantData.filter((restaurant) => {
    const filteredSearch =
      restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.city.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.genre.toLowerCase().includes(search.toLowerCase()) ||
      search === '';

    const filteredState =
      state.includes('all') || restaurant.state.toLowerCase().includes(state.toLowerCase());

    const filteredGenre =
      genre.includes('all') || restaurant.genre.toLowerCase().includes(genre.toLowerCase());

    return filteredSearch && filteredState && filteredGenre;
  });

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header handleChange={handleChange} />
      <table className="restaurant-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Phone Number</th>
            <th>Genres</th>
          </tr>
          {loading ? (
            <tr>
              <th>loading...</th>
            </tr>
          ) : (
            currentRestaurants.map((restaurant) => (
              <tr>
                <td>{restaurant.name}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.state}</td>
                <td>{restaurant.telephone}</td>
                <td>{restaurant.genre}</td>
              </tr>
            ))
          )}
          {filteredRestaurants.length === 0 && (
            <tr>
              <th className="alternate-states">Sorry, no results match your search :(</th>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalRestaurants={filteredRestaurants.length}
        restaurantsPerPage={restaurantsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
