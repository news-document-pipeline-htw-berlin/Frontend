import React from 'react';
import PropTypes from 'prop-types';
import {
    AreaSeries,
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

const AreaChart = ({ data }) => {
    if (!data) {
        return null;
    }

    return (
        <XYPlot width={400} height={400}>
            <VerticalGridLines />
            <HorizontalGridLines />

            <XAxis title="X" />
            <YAxis title="Y" />

            <AreaSeries
                className="area-series-example"
                curve="curveNatural"
                data={data}
            />
        </XYPlot>
    );
};

AreaChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    )
};

AreaChart.defaultProps = {
    data: null
};

export default AreaChart;
