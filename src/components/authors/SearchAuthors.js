import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SearchBar from 'material-ui-search-bar';
import { wording } from '../common/common';

/**
 * A search bar for authors. The search term will be used as author id.
 * @param {*} param0 setId
 */
export default function SearchAuthors({ setId }) {
    const [search, setSearch] = useState('');

    return (
        <SearchBar
            placeholder={wording.author.search}
            value={search}
            onChange={newValue => setSearch(newValue)}
            onRequestSearch={() => setId(search)}
            onCancelSearch={() => {
                setSearch('');
                setId('');
            }}
        />
    );
}

SearchAuthors.propTypes = {
    setId: PropTypes.func.isRequired
};
