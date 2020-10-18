import React, { useEffect, useState } from 'react';
import { STATES, GENRES } from './constants';
import './App.css';

const App = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    e.target.name === 'State' && setState(e.target.value);
    e.target.name === 'Genre' && setGenre(e.target.value);
  };

  const filteredRestaurants = restaurantData.filter((restaurant) => {
    const filteredState =
      state.includes('all') || restaurant.state.toLowerCase().includes(state.toLowerCase());
    const filteredGenre =
      genre.includes('all') || restaurant.genre.toLowerCase().includes(genre.toLowerCase());

    return filteredState && filteredGenre;
  });

  return (
    <div className="App">
      <div>
        <label>
          <span>State:</span>
          <select name="State" onChange={(e) => handleChange(e)}>
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
        <label>
          <span>Genre:</span>
          <select name="Genre" onChange={(e) => handleChange(e)}>
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
      <table>
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
            filteredRestaurants.map((restaurant) => (
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
              <th>Sorry, no results match your search :(</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
