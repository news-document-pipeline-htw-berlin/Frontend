/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

const Search = ({ reloadArticles }) => {
    const authors = [
        { name: 'AuthorA' },
        { name: 'AuthorB' },
        { name: 'AuthorC' }
    ];

    const [author, setAuthor] = useState('');

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            reloadArticles({
                author
            });
        }
    }

    function handleChange(e, value) {
        setAuthor(value);
    }
    return (
        <Autocomplete
            options={authors}
            inputValue={author}
            onKeyPress={handleKeyPress}
            onInputChange={handleChange}
            getOptionLabel={option => option.name}
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
