import React from 'react';
import {  TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Search = () => (
    <TextField
        label="Search articles"
        type="search"
        margin="normal"
        variant="outlined"
        fullWidth
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
            )
          }}
        
    />
)

export default Search;