import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Checkbox,
    ListItemText,
    Select,
    OutlinedInput
} from '@material-ui/core';
import { useNewspaper } from '../../hooks/useNewspaper';

const SelectNewspaper = ({ reloadArticles }) => {
    const newspaperMapping = [
        { tag: 'taz', label: 'taz' },
        { tag: 'sz', label: 'Süddeutsche Zeitung' },
        { tag: 'heise', label: 'Heise' }
    ];

    const { newspapers: newspaperTags } = useNewspaper();

    const newspapers = newspaperTags.map(newspaper =>
        newspaperMapping.find(mappingEntry => mappingEntry.tag === newspaper)
    );

    const [selectedNewspapers, setSelectedNewspapers] = useState([]);

    function handleChange(e) {
        setSelectedNewspapers(e.target.value);
    }

    function handleClose() {
        reloadArticles({
            newspaper: selectedNewspapers.map(
                newspaper =>
                    newspapers.find(entry => entry.label === newspaper).tag
            )
        });
    }

    return (
        <FormControl fullWidth style={{ margin: 20 }}>
            <InputLabel style={{ marginLeft: 10 }}>Newspapers</InputLabel>
            <Select
                multiple
                value={selectedNewspapers}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={selected => selected.join(', ')}
                onClose={handleClose}
            >
                {newspapers.map(entry => (
                    <MenuItem key={entry.label} value={entry.label}>
                        <Checkbox
                            checked={selectedNewspapers.includes(entry.label)}
                        />
                        <ListItemText primary={entry.label} />
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
