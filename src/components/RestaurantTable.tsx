import React, { useState } from 'react';

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

type Props = { loading: boolean; currentRestaurants: Restaurant[] };

const RestaurantTable: React.FC<Props> = ({ loading, currentRestaurants }) => {
  const [showRestaurantDetails, setShowRestaurantDetails] = useState(false);
  const [restaurantID, setRestaurantID] = useState('');

  const showDetails = (e: React.SyntheticEvent, id: string) => {
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
          currentRestaurants.map((restaurant: Restaurant) => (
            <>
              <tr
                className={`${
                  showRestaurantDetails && restaurant.id === restaurantID ? 'expanded-row-top' : ''
                }`}
                key={restaurant.id}
                onClick={(e) => showDetails(e, restaurant.id)}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.state}</td>
                <td>{restaurant.telephone}</td>
                <td>{restaurant.genre.replace(/,/g, ', ')}</td>
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
                    <td className="expanded-data-cell">
                      <b>Attire:</b>
                      <div>
                        {restaurant.attire
                          .split(' ')
                          .map((word) => word[0].toUpperCase() + word.slice(1))
                          .join(' ')}
                      </div>
                    </td>
                    <td className="expanded-data-cell"></td>
                  </tr>
                ) : null}
              </>
            </>
          ))
        )}
        {!loading && currentRestaurants.length === 0 && (
          <tr>
            <th className="alternate-states">Sorry, no results match your search :(</th>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RestaurantTable;
