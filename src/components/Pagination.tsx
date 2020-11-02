import React from 'react';

type Props = {
  restaurantsPerPage: number;
  totalRestaurants: number;
  currentPage: number;
  paginate: Function;
};

const Pagination: React.FC<Props> = ({
  restaurantsPerPage,
  totalRestaurants,
  currentPage,
  paginate,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalRestaurants / restaurantsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-list col-3">
      {pageNumbers.map((number) => {
        return (
          <li key={number}>
            <button
              className={`${
                number === currentPage ? 'pagination-list-item-focus' : 'pagination-list-item'
              }`}
              onClick={(e) => paginate(e, number)}
            >
              {number}
            </button>
          </li>
        );
      })}
    </div>
  );
};

export default Pagination;
