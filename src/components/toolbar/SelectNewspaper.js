import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Checkbox,
    ListItemText,
    Input,
    Select
} from '@material-ui/core';

const SelectNewspaper = ({ handleToolbarUpdate }) => {
    const newspapers = [
        { title: 'Süddeutsche Zeitung' },
        { title: 'taz' },
        { title: 'Die Zeit' }
    ];

    const [selectedNewspapers, setSelectedNewspapers] = useState([]);

    function handleChange(e) {
        setSelectedNewspapers(e.target.value);
        handleToolbarUpdate();
    }

    return (
        <FormControl fullWidth>
            <InputLabel>Newspapers</InputLabel>
            <Select
                multiple
                value={selectedNewspapers}
                onChange={handleChange}
                input={<Input />}
                renderValue={selected => selected.join(', ')}
            >
                {newspapers &&
                    newspapers.map(entry => (
                        <MenuItem key={entry.title} value={entry.title}>
                            <Checkbox
                                checked={selectedNewspapers.includes(
                                    entry.title
                                )}
                            />
                            <ListItemText primary={entry.title} />
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
};

SelectNewspaper.propTypes = {
    handleToolbarUpdate: PropTypes.func.isRequired
};

export default SelectNewspaper;
