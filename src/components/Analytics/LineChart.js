import React from 'react';
import PropTypes from 'prop-types';
import {
    HorizontalGridLines,
    LineMarkSeries,
    LineSeries,
    LineSeriesCanvas,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

const LineChart = ({ data }) => {
    if (!data) {
        return null;
    }

    return (
        <XYPlot width={400} height={400}>
            <VerticalGridLines />
            <HorizontalGridLines />

            <XAxis title="X" />
            <YAxis title="Y" />

            {data.map(x => {
                return (
                    <LineSeries
                        data={x}
                        style={{
                            strokeLinejoin: 'round',
                            strokeWidth: 4
                        }}
                        curve="curveMonotoneX"
                    />
                );
            })}
        </XYPlot>
    );
};

LineChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number
            })
        )
    )
};

LineChart.defaultProps = {
    data: null
};

export default LineChart;
