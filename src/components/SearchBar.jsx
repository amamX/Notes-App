import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ keyword, keywordChange, locale }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={locale === 'id' ? 'Cari berdasarkan judul ...' : 'Search by title ...'}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default SearchBar;
