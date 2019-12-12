/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Search = () => {
    const authors = [
        { name: 'AuthorA' },
        { name: 'AuthorB' },
        { name: 'AuthorC' }
    ];
    return (
        <Autocomplete
            options={authors}
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

export default Search;
