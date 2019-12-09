import React from 'react';
import PropTypes from 'prop-types';
import {
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries,
    LineSeriesCanvas,
    VerticalGridLines,
    VerticalRectSeries,
    XAxis,
    XYPlot,
    YAxis
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

const BarChart = ({ data }) => {
    if (!data) {
        return null;
    }

    return (
        <XYPlot width={400} height={400} xType="time" yDomain={[0.1, 2.1]}>
            <VerticalGridLines />
            <HorizontalGridLines />

            <XAxis title="X" />
            <YAxis title="Y" />

            <VerticalRectSeries data={data} />
        </XYPlot>
    );
};

BarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    )
};

BarChart.defaultProps = {
    data: null
};

export default BarChart;
