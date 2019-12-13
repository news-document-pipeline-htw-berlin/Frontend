import React, { useState } from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Checkbox,
    ListItemText,
    Input,
    Select
} from '@material-ui/core';

const SelectNewspaper = () => {
    const newspapers = [
        { title: 'Süddeutsche Zeitung' },
        { title: 'taz' },
        { title: 'Die Zeit' }
    ];

    const [selectedNewspapers, setSelectedNewspapers] = useState([]);

    function handleChange(e) {
        setSelectedNewspapers(e.target.value);
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

export default SelectNewspaper;
