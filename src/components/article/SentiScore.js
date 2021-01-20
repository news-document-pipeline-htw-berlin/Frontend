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
    for (let i = -5; i <= 5; i += 2.5) {
        values.push(i);
    }

    return (
        <Stepper alternativeLabel style={{ backgroundColor: 'transparent' }}>
            {values.map(v => {
                if (senti >= v - 1.25 && senti <= v + 1.25) {
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
