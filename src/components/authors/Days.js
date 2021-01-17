/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    DiscreteColorLegend,
    LabelSeries,
    RadialChart,
    ArcSeries,
    Hint
} from 'react-vis';
import { Grid } from '@material-ui/core';
import { endsWith } from 'lodash';

import Tooltip from '@material-ui/core/Tooltip';
import { deepOrange } from '@material-ui/core/colors';
import SentiPopover from './SentiPopover';

function buildValue(hoveredCell) {
    const { radius, angle, angle0 } = hoveredCell;
    const truedAngle = (angle + angle0) / 2;
    return {
        x: radius * Math.cos(truedAngle),
        y: radius * Math.sin(truedAngle)
    };
}

const FULL = Math.PI * 2;
function Days(props) {
    const [value, setValue] = useState(false);
    const COLORS = [
        '#19CDD7',
        '#DDB27C',
        '#88572C',
        '#FF991F',
        '#F15C17',
        '#223F9A',
        '#DA70BF',
        '#125C77',
        '#4DC19C',
        '#776E57',
        '#12939A',
        '#17B8BE',
        '#F6D18A',
        '#B7885E',
        '#FFCB99',
        '#F89570',
        '#829AE3',
        '#E79FD5',
        '#1E96BE',
        '#89DAC1',
        '#B3AD9E'
    ];
    const { PI } = Math;
    const { author } = props;
    const [radio, setRadio] = useState(true);
    const departments = [
        { x: 'Digital', y: 0, color: 0 },
        { x: 'Wirtschaft', y: 0, color: 0 },
        { x: 'Politik', y: 0, color: 0 },
        { x: 'Wissen', y: 0, color: 0 },
        { x: 'Panorama', y: 0, color: 0 },
        { x: 'Regional', y: 0, color: 0 },
        { x: 'Umwelt', y: 0, color: 0 },
        { x: 'Gesellschaft', y: 0, color: 0 },
        { x: 'Kultur', y: 0, color: 0 },
        { x: 'Arbeit', y: 0, color: 0 },
        { x: 'Sport', y: 0, color: 0 },
        { x: 'Meinung', y: 0, color: 0 },
        { x: 'Satire', y: 0, color: 0 },
        { x: 'Reise', y: 0, color: 0 },
        { x: 'Geschichte', y: 0, color: 0 }
    ];

    const [daysPublished, setDaysPublished] = useState([]);
    const myData = [
        { angle0: 0, angle: Math.PI, opacity: 0.2, radius: 2, radius0: 1 },
        { angle0: PI, angle: 2 * PI, radius: 2, radius0: 1 }
    ];
    useEffect(() => {
        let total = 0;
        let start = 0;
        let end = 0;
        const data = [];
        author.daysPublished.forEach(d => {
            total += d._2;
        });
        setDaysPublished([]);
        author.daysPublished.forEach((dep, index) => {
            if (author.sentimentPerDay) {
                author.sentimentPerDay.forEach(sent => {
                    if (sent._1 === dep._1) {
                        end += FULL * (dep._2 / total);
                        /* setDaysPublished(daysPublished => [...daysPublished,
                        {
                            angle0: 0, angle: (FULL * (dep._2 / total)), opacity: 1, radius: 2.5,
                            radius0: 0, color: COLORS[index], day: dep._1, sent: sent._2
                        }
                        ]); */
                        data.push({
                            angle0: start,
                            angle: end,
                            opacity: 1,
                            radius: 2.5,
                            radius0: 0,
                            color: COLORS[index],
                            count: dep._2,
                            day: dep._1,
                            sent: sent._2
                        });
                        start = end;
                    }
                });
            } else {
                end += FULL * (dep._2 / total);
                data.push({
                    angle0: start,
                    angle: end,
                    opacity: 1,
                    radius: 2.5,
                    radius0: 0,
                    color: COLORS[index],
                    count: dep._2,
                    day: dep._1
                });
                start = end;
            }
        });
        setDaysPublished(data);
    }, [COLORS, author]);

    return (
        <div>
            <XYPlot
                xDomain={[-3, 3]}
                yDomain={[-3, 3]}
                width={700}
                height={450}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickLabelAngle={-45} />
                <YAxis />
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

export default Days;
