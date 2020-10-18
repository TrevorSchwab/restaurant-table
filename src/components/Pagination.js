import React from 'react';

const Pagination = ({ restaurantsPerPage, totalRestaurants, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-list col-3">
      {pageNumbers.map((number) => {
        return (
          <li key={number} className="pagination-list-item">
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </li>
        );
      })}
    </div>
  );
};

export default Pagination;
