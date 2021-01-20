/* eslint no-underscore-dangle: ["error", { "allow": ["_1", "_2"] }] */
/* eslint no-shadow : "off" */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries
} from 'react-vis';

/**
 * Represents the word count for an author as a LineMarkSeries.
 * @param {*} props author
 */
export default function WordCount(props) {
    const { author } = props;
    const [lastTexts, setLastTexts] = useState([]);

    useEffect(() => {
        const texts = [];
        author.lastTexts.forEach(value => {
            texts.push({ x: value._1, y: value._2 });
        });
        setLastTexts(texts);
    }, [author]);

    return (
        <div>
            <Grid container>
                <Grid item>
                    <Typography>Average:&nbsp;</Typography>
                </Grid>
                <Grid item>
                    <Typography style={{ fontWeight: 'bold' }}>
                        {Number(author.averageWords).toFixed(2)}&nbsp;
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>Words per Article</Typography>
                </Grid>
            </Grid>

            <XYPlot xType="ordinal" width={700} height={600} xDistance={50}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineMarkSeries data={lastTexts} />
            </XYPlot>
        </div>
    );
}

WordCount.propTypes = {
    author: PropTypes.object.isRequired
};
