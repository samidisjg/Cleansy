import React from 'react';

const SearchBar = ({ onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
    />
  );
};

export default SearchBar;
