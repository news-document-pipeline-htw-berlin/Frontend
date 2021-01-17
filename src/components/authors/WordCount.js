/* eslint no-underscore-dangle: ["error", { "allow": ["_1", "_2"] }] */
/* eslint no-shadow : "off" */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    LineMarkSeries
} from 'react-vis';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function WordCount(props) {
    const { author } = props;
    const [lastTexts, setLastTexts] = useState([]);

    useEffect(() => {
        setLastTexts([]);
        author.lastTexts.forEach(value => {
            setLastTexts(lastTexts => [
                ...lastTexts,
                { x: value._1, y: value._2 }
            ]);
        });
    }, [author]);

    return (
        <div>
            <Grid container>
                <Grid item>
                    <Typography>Average:&nbsp;</Typography>
                </Grid>
                <Grid item>
                    <Typography style={{ fontWeight: 'bold' }}>
                        {author.averageWords}&nbsp;
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>Words per Article</Typography>
                </Grid>
            </Grid>

            <XYPlot xType="ordinal" width={700} height={450} xDistance={50}>
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

export default WordCount;
