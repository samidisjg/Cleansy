import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by title"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
    />
  );
};

export default SearchBar;
