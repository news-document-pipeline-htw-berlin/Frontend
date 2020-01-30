import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import useQueryParams from '../../hooks/useQueryParams';
import { wording } from '../common/common';

const Search = ({ reloadArticles }) => {
    const { query } = useQueryParams();
    const [searchQuery, setSearchQuery] = useState(query || '');

    useEffect(() => {
        setSearchQuery(query || '');
    }, [query]);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            reloadArticles({ query: searchQuery });
        }
    }

    function handleClear() {
        setSearchQuery('');
        reloadArticles({ query: '' });
    }

    function handleChange(e) {
        setSearchQuery(e.target.value);
    }

    return (
        <TextField
            label={wording.toolbar.search.label}
            onKeyPress={handleKeyPress}
            variant="outlined"
            value={searchQuery}
            fullWidth
            onChange={handleChange}
            InputProps={
                searchQuery
                    ? {
                          endAdornment: (
                              <InputAdornment
                                  position="end"
                                  onClick={handleClear}
                                  style={{ cursor: 'pointer' }}
                              >
                                  <CloseIcon
                                      color="disabled"
                                      fontSize="small"
                                  />
                              </InputAdornment>
                          )
                      }
                    : {}
            }
        />
    );
};

Search.propTypes = {
    reloadArticles: PropTypes.func.isRequired
};

export default Search;
