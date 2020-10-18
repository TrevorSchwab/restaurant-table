import React, { useEffect, useState } from 'react';
import { STATES, GENRES } from './constants';
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
    <div className="App">
      <div className="filter-controls">
        <div className="search-container col-5">
          <form name="Search" onSubmit={(e) => handleChange(e)}>
            <label>
              <input
                placeholder="Search Restaurants"
                name="Search"
                id="onChangeSearch"
                onChange={(e) => handleChange(e)}
              />
            </label>
            <input className="filterInputs" type="submit" value="Submit" />
          </form>
        </div>
        <div className="dropdown-controls col-7">
          <label className="input-labels">
            <span>State:</span>
            <select className="filter-inputs" name="State" onChange={(e) => handleChange(e)}>
              <option value="all">All</option>
              {STATES.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="input-labels">
            <span>Genre:</span>
            <select className="filter-inputs" name="Genre" onChange={(e) => handleChange(e)}>
              <option value="all">All</option>
              {GENRES.map((genre) => {
                return (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>
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
