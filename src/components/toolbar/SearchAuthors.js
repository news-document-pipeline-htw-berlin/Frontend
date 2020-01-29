/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import EndpointConstants from '../../constants/EndpointConstants';
import { unauthorized } from '../../state/httpClient';
import useDebounce from '../../hooks/useDebounce';
import useQueryParams from '../../hooks/useQueryParams';
import { wording } from '../common/common';

const Search = ({ reloadArticles }) => {
    const { author: authorParam } = useQueryParams();
    const [suggestions, setSuggestions] = useState([]);
    const [authors, setAuthors] = useState(authorParam || '');
    const [async, setAsync] = useState({ isLoading: false, error: null });

    useEffect(() => {
        setAuthors(authorParam || '');
    }, [authorParam]);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            reloadArticles({
                author: authors
            });
        }
    }

    const debouncedSearchTerm = useDebounce(authors, 400);

    function handleChange(e, value) {
        setAuthors(value);
    }

    useEffect(() => {
        const { method, path } = EndpointConstants.AUTHOR_LIST;
        async function fetchAuthors() {
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
                    label={wording.toolbar.authors.label}
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
