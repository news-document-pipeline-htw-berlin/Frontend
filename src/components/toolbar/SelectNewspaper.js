import React from 'react';
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
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import useQueryParams from '../../hooks/useQueryParams';
import { useNewspaper } from '../../hooks/useNewspaper';
import { wording } from '../common/common';

const SelectNewspaper = ({ reloadArticles }) => {
    const history = useHistory();
    const newspaperMapping = {
        taz: 'Taz',
        sz: 'Süddeutsche Zeitung',
        heise: 'Heise',
        golem: 'Golem',
        postillon: 'Postillon'
    };

    // ['sz', 'taz', 'heise']
    const { newspapers: newspaperTags } = useNewspaper();

    const queryParams = useQueryParams();

    function getNewspaperParam() {
        const { newspaper } = queryParams;
        if (Array.isArray(newspaper)) {
            return newspaper.map(entry => newspaperMapping[entry]);
        }
        if (!newspaper) {
            return [];
        }
        return [newspaperMapping[newspaper]];
    }

    // ['sz']
    const newspaperParam = getNewspaperParam();

    const newspapers = newspaperTags.map(
        newspaper => newspaperMapping[newspaper]
    );

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function handleClose() {
        reloadArticles({
            newspaper: newspaperParam.map(newspaper =>
                getKeyByValue(newspaperMapping, newspaper)
            )
        });
    }

    function handleChange(e) {
        const newParams = e.target.value.map(newspaper =>
            getKeyByValue(newspaperMapping, newspaper)
        );
        history.push({
            search: `?${stringify({
                ...queryParams,
                page: 1,
                newspaper: newParams
            })}`
        });
    }

    return (
        <FormControl fullWidth>
            <InputLabel style={{ marginLeft: 10 }}>
                {wording.toolbar.newspaper.label}
            </InputLabel>
            <Select
                multiple
                value={newspaperParam}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={selected => selected.join(', ')}
                onClose={handleClose}
            >
                {newspapers.map(entry => (
                    <MenuItem key={entry} value={entry}>
                        <Checkbox checked={newspaperParam.includes(entry)} />
                        <ListItemText primary={entry} />
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
