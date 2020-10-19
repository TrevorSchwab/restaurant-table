import React from 'react';
import { STATES, GENRES, ATTIRE } from '../constants';

type Props = { handleChange: Function };

const Header: React.FC<Props> = ({ handleChange }) => {
  return (
    <div className="filter-controls ">
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
        <label className="input-labels">
          <span>Attire:</span>
          <select className="filter-inputs" name="Attire" onChange={(e) => handleChange(e)}>
            <option value="all">All</option>
            {ATTIRE.map((attire) => {
              return (
                <option key={attire} value={attire}>
                  {attire}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Header;
