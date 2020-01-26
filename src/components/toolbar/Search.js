import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import useQueryParams from '../../hooks/useQueryParams';

const Search = ({ reloadArticles }) => {
    const { query } = useQueryParams();
    const [searchQuery, setSearchQuery] = useState(query || '');

    useEffect(() => {
        setSearchQuery(query);
    }, [query]);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            reloadArticles({ query: searchQuery });
        }
    }
    return (
        <TextField
            label="Stichwortsuche"
            type="search"
            onKeyPress={handleKeyPress}
            variant="outlined"
            value={searchQuery}
            fullWidth
            onChange={e => setSearchQuery(e.target.value)}
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
