import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { XYPlot, ArcSeries, LabelSeries } from 'react-vis';

/**
 * Displays an author's score in an ArcSeries.
 * @param {*} param0 score
 */
export default function Score({ score }) {
    const [value, setValue] = useState(0);
    const data = [
        {
            angle0: 0,
            angle: (2 / 100) * value * Math.PI,
            opacity: 1,
            radius: 2.5,
            radius0: 1.5
        },
        {
            angle0: 0,
            angle: 2 * Math.PI,
            opacity: 0.5,
            radius: 2.5,
            radius0: 1.5
        }
    ];

    const label = [
        {
            x: 0,
            y: 0,
            label: score,
            xOffset: 10,
            yOffset: 10
        }
    ];

    useEffect(() => {
        setValue(score);
    }, [score]);

    return (
        <XYPlot xDomain={[-3, 3]} yDomain={[-3, 3]} width={300} height={300}>
            <LabelSeries allowOffsetToBeReversed data={label} />
            <ArcSeries
                animation={{
                    damping: 9,
                    stiffness: 300
                }}
                radiusDomain={[0, 3]}
                data={data}
            />
        </XYPlot>
    );
}

Score.propTypes = {
    score: PropTypes.number.isRequired
};
