/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import EndpointConstants from '../../constants/EndpointConstants';
import { unauthorized } from '../../state/httpClient';
import useDebounce from '../../hooks/useDebounce';

const Search = ({ reloadArticles }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [authors, setAuthors] = useState('');
    const [async, setAsync] = useState({ isLoading: false, error: null });

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            reloadArticles({
                author: authors
            });
        }
    }

    const debouncedSearchTerm = useDebounce(authors, 500);

    async function fetchAuthors() {
        const { method, path } = EndpointConstants.AUTHORS_LIST;
        try {
            setAsync({ isLoading: true, error: false });
            const res = await unauthorized({
                method,
                path: path(debouncedSearchTerm)
            });
            setSuggestions(res);
            setAsync({ isLoading: false, error: null });
        } catch (err) {
            setAsync({ isLoading: false, error: err });
        }
    }

    function handleChange(e, value) {
        setAuthors(value);
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchAuthors(debouncedSearchTerm);
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearchTerm]);

    return (
        <Autocomplete
            options={suggestions}
            inputValue={authors}
            onKeyPress={handleKeyPress}
            onInputChange={handleChange}
            renderInput={params => (
                <TextField
                    {...params}
                    margin="normal"
                    label="Search authors"
                    variant="outlined"
                    fullWidth
                />
            )}
        />
    );
};

Search.propTypes = {
    reloadArticles: PropTypes.func.isRequired
};

export default Search;
