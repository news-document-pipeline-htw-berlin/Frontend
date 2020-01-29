import React from 'react';
import PropTypes from 'prop-types';
import {
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    FlexibleWidthXYPlot,
    YAxis,
    VerticalBarSeries,
    DiscreteColorLegend
} from 'react-vis';
import { Grid } from '@material-ui/core';

const barColors = ['#0868ac', '#43a2ca', '#7bccc4', 'bae4bc', 'f0f9e8'];

const Chart = ({ data }) => {
    if (!data.length) {
        return null;
    }

    const legend = data.map((entry, index) => (
        <DiscreteColorLegend
            orientation="horizontal"
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
            <Grid item xs={10}>
                {legend}
                <FlexibleWidthXYPlot xType="time" height={300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis tickLabelAngle={-45} />
                    <YAxis />
                    {plots}
                </FlexibleWidthXYPlot>
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
