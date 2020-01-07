import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

const Search = ({ reloadArticles }) => {
    const [query, setQuery] = useState('');

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            reloadArticles({ query });
        }
    }
    return (
        <TextField
            label="Search articles"
            type="search"
            onKeyPress={handleKeyPress}
            margin="normal"
            variant="outlined"
            value={query}
            fullWidth
            onChange={e => setQuery(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                )
            }}
        />
    );
};

Search.propTypes = {
    reloadArticles: PropTypes.func.isRequired
};

export default Search;
