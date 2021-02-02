/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';

import { Stepper, Step, StepLabel, Tooltip } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { EVAL } from './sentiEval';

function Icon(active, val) {
    if (active) {
        switch (val) {
            case 1:
                return <RemoveCircleIcon style={{ fill: '#f44336' }} />; // very negative
            case 2:
                return <RemoveCircleIcon style={{ fill: '#fb8c00' }} />; // negative
            case 3:
                return <RadioButtonCheckedIcon style={{ fill: '#b0bec5' }} />; // neutral
            case 4:
                return <AddCircleIcon style={{ fill: '#8bc34a' }} />; // positive
            case 5:
                return <AddCircleIcon style={{ fill: '#00c853' }} />; // very positive
            default:
                return null;
        }
    }
    return <RadioButtonUncheckedIcon style={{ fill: '#cfd8dc' }} />;
}

/**
 * Represents the given sentiment on scale of 5 points.
 * By hovering over the point, its value will be displayed in a tooltip.
 * @param {*} param0 senti
 */
export default function SentiScore({ senti }) {
    const values = [];

    for (let i = 1; i <= 5; i++) {
        values.push(i);
    }

    return (
        <Stepper alternativeLabel style={{ padding: 0 }}>
            {values.map(v => {
                if (
                    (senti <= 1 && v === 1) ||
                    (senti >= 5 && v === 5) ||
                    (Math.round(senti) >= v - 0.5 &&
                        Math.round(senti) <= v + 0.5)
                ) {
                    return (
                        <Tooltip
                            title={`SentScore: ${Number(senti).toFixed(2)} (${
                                EVAL[v - 1]
                            })`}
                            placement="top-start"
                        >
                            <Step>
                                <StepLabel
                                    StepIconComponent={t => Icon(true, v)}
                                />
                            </Step>
                        </Tooltip>
                    );
                }
                return (
                    <Step>
                        <StepLabel StepIconComponent={t => Icon(false)} />
                    </Step>
                );
            })}
        </Stepper>
    );
}

SentiScore.propTypes = {
    senti: PropTypes.number.isRequired
};
