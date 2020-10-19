import React, { useState } from 'react';

const RestaurantTable = ({ loading, currentRestaurants }) => {
  const [showRestaurantDetails, setShowRestaurantDetails] = useState(false);
  const [restaurantID, setRestaurantID] = useState('');

  const showDetails = (event, id) => {
    setShowRestaurantDetails(!showRestaurantDetails);
    setRestaurantID(id);
  };
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
            <th className="alternate-states">loading...</th>
          </tr>
        ) : (
          currentRestaurants.map((restaurant) => (
            <>
              <tr
                className={`banner ${
                  showRestaurantDetails && restaurant.id === restaurantID ? 'expanded-row-top' : ''
                }`}
                key={restaurant.id}
                onClick={(event) => showDetails(event, restaurant.id)}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.state}</td>
                <td>{restaurant.telephone}</td>
                <td>{restaurant.genre}</td>
              </tr>
              <>
                {showRestaurantDetails && restaurant.id === restaurantID ? (
                  <tr className="expanded-row-bottom">
                    <td className="expanded-data-cell">
                      <b>Hours:</b>
                      <div>{restaurant.hours}</div>
                    </td>
                    <td className="expanded-data-cell">
                      <b>Address:</b>
                      <div>{restaurant.address1}</div>
                    </td>
                    <td className="expanded-data-cell">
                      <b>Website:</b>
                      <div>{restaurant.website}</div>
                    </td>
                    <td className="expanded-data-cell"></td>
                    <td className="expanded-data-cell"></td>
                  </tr>
                ) : null}
              </>
            </>
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
