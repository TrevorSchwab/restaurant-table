import React from 'react';

type Props = { restaurantsPerPage: number; totalRestaurants: number; paginate: Function };

const Pagination: React.FC<Props> = ({ restaurantsPerPage, totalRestaurants, paginate }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-list col-3">
      {pageNumbers.map((number) => {
        return (
          <li key={number} className="pagination-list-item">
            <a onClick={(e) => paginate(e, number)} href="!#">
              {number}
            </a>
          </li>
        );
      })}
    </div>
  );
};

export default Pagination;
