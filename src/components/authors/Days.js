/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { XYPlot, ArcSeries, Hint } from 'react-vis';

import { COLORS } from '../../constants/ChartColors';
import SentiPopover from './SentiPopover';
import { WEEKDAY } from '../../constants/Weekdays';

/**
 * Represents statistics for the days an author has published articles on.
 * The data is displayed as a pie chart.
 * @param {*} props author
 */
export default function Days(props) {
    const { author } = props;
    const [daysPublished, setDaysPublished] = useState([]);
    const [value, setValue] = useState(false);
    const FULL = Math.PI * 2;

    function buildValue(hoveredCell) {
        const { radius, angle, angle0 } = hoveredCell;
        const truedAngle = (angle + angle0) / 2;
        return {
            x: radius * Math.cos(truedAngle),
            y: radius * Math.sin(truedAngle)
        };
    }

    const getDataWithSentiments = useCallback(
        (data, start, end, dep, index) => {
            author.sentimentPerDay.forEach(sent => {
                if (sent._1 === dep._1) {
                    data.push({
                        angle0: start,
                        angle: end,
                        opacity: 1,
                        radius: 2.5,
                        radius0: 0,
                        color: COLORS[index],
                        count: dep._2,
                        day: WEEKDAY()[dep._1],
                        sent: sent._2
                    });
                }
            });
        },
        [author.sentimentPerDay]
    );

    function getData(data, start, end, dep, index) {
        data.push({
            angle0: start,
            angle: end,
            opacity: 1,
            radius: 2.5,
            radius0: 0,
            color: COLORS[index],
            count: dep._2,
            day: WEEKDAY()[dep._1]
        });
    }

    useEffect(() => {
        let total = 0;
        let start = 0;
        let end = 0;
        const data = [];

        author.daysPublished.forEach(d => {
            total += d._2;
        });

        author.daysPublished.forEach((dep, index) => {
            end += FULL * (dep._2 / total);
            if (author.sentimentPerDay) {
                getDataWithSentiments(data, start, end, dep, index);
            } else {
                getData(data, start, end, dep, index);
            }
            start = end;
        });
        setDaysPublished(data);
    }, [FULL, author, getDataWithSentiments]);

    return (
        <div>
            <XYPlot
                margin={0}
                xDomain={[-3, 3]}
                yDomain={[-3, 3]}
                width={700}
                height={600}
            >
                <ArcSeries
                    animation={{
                        damping: 9,
                        stiffness: 300
                    }}
                    colorRange={COLORS}
                    colorType="category"
                    onValueMouseOver={row => setValue(row)}
                    onSeriesMouseOut={() => setValue(false)}
                    radiusDomain={[0, 3]}
                    data={daysPublished.map(row => {
                        if (value && value.color === row.color) {
                            return {
                                ...row,
                                style: { stroke: 'black', strokeWidth: '2px' }
                            };
                        }
                        return row;
                    })}
                />
                {value && (
                    <Hint value={buildValue(value)}>
                        <SentiPopover value={value} />
                    </Hint>
                )}
            </XYPlot>
        </div>
    );
}

Days.propTypes = {
    author: PropTypes.object.isRequired
};
