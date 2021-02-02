/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import EndpointConstants from '../../constants/EndpointConstants';
import { unauthorized } from '../../state/httpClient';
import useDebounce from '../../hooks/useDebounce';
import useQueryParams from '../../hooks/useQueryParams';
import { wording } from '../common/common';

/**
 * A search bar for authors. The search term will be used as author id.
 * @param {*} param0 setId
 */
export default function SearchAuthors({ setId }) {
    const { author: authorParam } = useQueryParams();
    const [suggestions, setSuggestions] = useState([]);
    const [authors, setAuthors] = useState(authorParam || '');

    useEffect(() => {
        setAuthors(authorParam || '');
    }, [authorParam]);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setId(authors);
        }
    }

    const debouncedSearchTerm = useDebounce(authors, 400);

    function handleChange(e, value, reason) {
        setAuthors(value);
        if (reason === 'clear') {
            setId('');
        }
    }

    useEffect(() => {
        const { method, path } = EndpointConstants.AUTHOR_LIST;
        async function fetchAuthors() {
            try {
                const res = await unauthorized({
                    method,
                    path: path(debouncedSearchTerm)
                });
                setSuggestions(res);
            } catch (err) {
                console.log(err);
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
}

SearchAuthors.propTypes = {
    setId: PropTypes.func.isRequired
};
