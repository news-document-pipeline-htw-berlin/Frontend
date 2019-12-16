import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { articleActions } from '../../state/actions';
import { getToolbar } from '../../state/article/selectors';
import { ToolbarPropTypes } from '../../constants/NewsPropTypes';

const Search = ({ toolbar, updateToolbar, handleToolbarUpdate }) => {
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleToolbarUpdate();
        }
    }
    return (
        <TextField
            label="Search articles"
            type="search"
            onKeyPress={handleKeyPress}
            margin="normal"
            variant="outlined"
            value={toolbar.query}
            fullWidth
            onChange={e => updateToolbar({ query: e.target.value })}
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
    toolbar: ToolbarPropTypes.isRequired,
    updateToolbar: PropTypes.func.isRequired,
    handleToolbarUpdate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    toolbar: getToolbar(state)
});

const mapDispatchToProps = {
    updateToolbar: articleActions.updateToolbar
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
