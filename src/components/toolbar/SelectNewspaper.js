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

const SelectNewspaper = ({ reloadArticles }) => {
    const newspapers = {
        sz: 'Süddeutsche Zeitung',
        taz: 'taz',
        zeit: 'Die Zeit'
    };

    const newspapersDummy = ['taz', 'sz', 'zeit'];

    const [selectedNewspapers, setSelectedNewspapers] = useState([]);

    function handleChange(e) {
        setSelectedNewspapers(e.target.value);
    }

    function handleClose() {
        reloadArticles({
            newspaper: selectedNewspapers
        });
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
                onClose={handleClose}
            >
                {newspapersDummy.map(entry => (
                    <MenuItem key={entry} value={newspapers[entry]}>
                        <Checkbox
                            checked={selectedNewspapers.includes(
                                newspapers[entry]
                            )}
                        />
                        <ListItemText primary={newspapers[entry]} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

SelectNewspaper.propTypes = {
    reloadArticles: PropTypes.func.isRequired
};

export default SelectNewspaper;
