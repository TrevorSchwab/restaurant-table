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
  const numberOfPages = Math.ceil(totalRestaurants / restaurantsPerPage);
  return (
    <div className="pagination-list col-3">
      {totalRestaurants > restaurantsPerPage &&
        Array(numberOfPages)
          .fill(0)
          .map((_, index) => {
            const page = ++index;
            return (
              <li key={page}>
                <button
                  className={`${
                    page === currentPage ? 'pagination-list-item-focus' : 'pagination-list-item'
                  }`}
                  onClick={(e) => paginate(e, index)}
                >
                  {page}
                </button>
              </li>
            );
          })}
    </div>
  );
};

export default Pagination;
