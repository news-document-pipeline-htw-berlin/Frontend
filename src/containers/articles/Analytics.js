import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {
    HorizontalGridLines,
    // LineSeries,
    VerticalGridLines,
    XAxis,
    XYPlot,
    YAxis,
    VerticalBarSeries,
    DiscreteColorLegend
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';
import { TextField, Typography } from '@material-ui/core';
import { unauthorized } from '../../state/httpClient';
import EndpointConstants from '../../constants/EndpointConstants';

const Analytics = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [response, setResponse] = useState({
        timeFrom: null,
        timeTo: null,
        query: '',
        totalResults: null,
        occurrences: []
    });

    const [async, setAsync] = useState({ isLoading: false, error: null });

    async function loadAnalytics() {
        const { method, path } = EndpointConstants.ANALYTICS_GET;
        try {
            setAsync({ isLoading: true, error: null });
            const res = await unauthorized({
                method,
                // path: path(query, timeFrom, timeTo)
                path: path({
                    query: searchQuery,
                    timeFrom: 1575154800000
                })
            });
            setResponse(res);
        } catch (err) {
            setAsync({ isLoading: false, error: err });
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            loadAnalytics();
        }
    }

    function renderGraph() {
        // TODO: remove default value for occurrences array once endpoint
        const { occurrences, timeFrom, timeTo, query } = response;

        if (!occurrences.length) {
            return (
                <div>
                    <p>Nothing here yet</p>
                </div>
            );
        }
        const plotData = occurrences.map(item => {
            return { x: item.date, y: item.occurrences };
        });

        const from = new Date(timeFrom);
        const fromFormat = `${from.getDate()}.${from.getMonth() +
            1}.${from.getFullYear()}`;
        const to = new Date(timeTo);
        const toFormat = `${to.getDate()}.${to.getMonth() +
            1}.${to.getFullYear()}`;

        return (
            <Grid container justify="center">
                <Grid item>
                    <DiscreteColorLegend
                        height={50}
                        width={100}
                        items={[{ title: query, color: '#3a3' }]}
                    />
                    <XYPlot width={1000} height={400} xType="time">
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="X" tickLabelAngle={-45} />
                        <YAxis title="Y" />
                        <VerticalBarSeries
                            data={plotData}
                            color="#009688"
                            barWidth={0.5}
                        />
                    </XYPlot>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container justify="center">
            <Grid item xs={10} md={4} xl={2}>
                <TextField
                    label="Search term"
                    type="search"
                    onKeyPress={handleKeyPress}
                    margin="normal"
                    variant="outlined"
                    value={searchQuery}
                    fullWidth
                    onChange={e => setSearchQuery(e.target.value)}
                />
                {renderGraph()}
            </Grid>
            {/* <Grid item>
                <Typography variant="h4" gutterBottom>
                    Query: {query}
                </Typography>
                <div>
                    <Typography>
                        Timeframe: {`${fromFormat} - ${toFormat}`}
                    </Typography>
                    <Typography>TotalHits: {totalResults}</Typography>
                </div>
            </Grid> */}
        </Grid>
    );
};
export default Analytics;
