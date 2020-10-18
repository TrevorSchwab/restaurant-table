import React from 'react';

const RestaurantTable = ({ loading, currentRestaurants }) => {
  return (
    <table className="restaurant-table">
      <tbody>
        <tr>
          <th>Name </th>
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
            <tr key={restaurant.id}>
              <td>{restaurant.name}</td>
              <td>{restaurant.city}</td>
              <td>{restaurant.state}</td>
              <td>{restaurant.telephone}</td>
              <td>{restaurant.genre}</td>
            </tr>
          ))
        )}
        {currentRestaurants.length === 0 && (
          <tr>
            <th className="alternate-states">Sorry, no results match your search :(</th>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RestaurantTable;
