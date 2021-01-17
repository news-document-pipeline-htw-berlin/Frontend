import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'material-ui-search-bar';

function SearchAuthors({ setId }) {
    const [search, setSearch] = useState();
    return (
        <SearchBar
            placeholder="Search Authors..."
            value={search}
            onChange={newValue => setSearch(newValue)}
            onRequestSearch={() => setId(search)}
            onCancelSearch={() => setId(null)}
        />
    );
}

SearchAuthors.propTypes = {
    setId: PropTypes.func.isRequired
};

export default SearchAuthors;
