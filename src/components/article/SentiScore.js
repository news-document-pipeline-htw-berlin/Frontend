/* eslint-disable no-plusplus */

import React from 'react';
import PropTypes from 'prop-types';

import { Stepper, Step, StepLabel, Tooltip } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Icon(active) {
    return <FiberManualRecordIcon color={active ? 'secondary' : 'primary'} />;
}

/**
 * Represents the given sentiment on scale of 5 points.
 * By hovering over the point, its value will be displayed in a tooltip.
 * @param {*} param0 senti
 */
export default function SentiScore({ senti }) {
    const values = [];

    // for (let i = -5; i <= 5; i += 2.5) {
    for (let i = 1; i <= 5; i++) {
        values.push(i);
    }

    return (
        <Stepper alternativeLabel style={{ backgroundColor: 'transparent' }}>
            {values.map(v => {
                if (
                    (senti <= 1 && v === 1) ||
                    (senti >= 5 && v === 5) ||
                    (Math.round(senti) >= v - 0.5 &&
                        Math.round(senti) <= v + 0.5)
                ) {
                    return (
                        <Tooltip
                            title={`SentScore: ${senti}`}
                            placement="top-start"
                        >
                            <Step>
                                <StepLabel
                                    StepIconComponent={t => Icon(true)}
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
