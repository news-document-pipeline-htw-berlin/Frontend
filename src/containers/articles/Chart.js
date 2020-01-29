import React from 'react';
import PropTypes from 'prop-types';
import {
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis,
    VerticalBarSeries,
    DiscreteColorLegend
} from 'react-vis';
import { Grid } from '@material-ui/core';

const barColors = ['#009688', '#960094'];

const Chart = ({ data }) => {
    if (!data.length) {
        return null;
    }

    const legend = data.map((entry, index) => (
        <DiscreteColorLegend
            height={40}
            width={200}
            items={[{ title: entry.query, color: barColors[index] }]}
        />
    ));

    const plotData = data.map(r => {
        return r.occurrences.map(item => {
            return { x: item.date, y: item.occurrences };
        });
    });

    const plots = plotData.map((entry, index) => (
        <VerticalBarSeries
            data={entry}
            color={barColors[index]}
            barWidth={0.5}
        />
    ));

    return (
        <Grid container justify="center">
            <Grid item>
                {legend}
                <XYPlot width={1000} height={400} xType="time">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="X" tickLabelAngle={-45} />
                    <YAxis title="Y" />
                    {plots}
                </XYPlot>
            </Grid>
        </Grid>
    );
};

Chart.propTypes = {
    data: PropTypes.array.isRequired,
    async: PropTypes.shape({
        isLoading: PropTypes.bool,
        error: PropTypes.object
    }).isRequired
};

export default Chart;
