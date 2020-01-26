import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import '../../../node_modules/react-vis/dist/style.css';
import { TextField, Chip } from '@material-ui/core';
import { unauthorized } from '../../state/httpClient';
import EndpointConstants from '../../constants/EndpointConstants';
import DatePicker from '../../components/analytics/DatePicker';
import Chart from './Chart';

const Analytics = () => {
    const [keywords, setKeywords] = useState([]);
    const [response, setResponse] = useState([]);
    const [async, setAsync] = useState({ isLoading: false, error: null });
    const [dates, setDates] = useState({ startDate: null, endDate: null });

    const [searchQuery, setSearchQuery] = useState('');

    async function loadAnalytics(query) {
        const { method, path } = EndpointConstants.ANALYTICS_GET;
        try {
            setAsync({ isLoading: true, error: null });
            const res = await unauthorized({
                method,
                path: path({
                    query,
                    timeFrom: dates.startDate.valueOf(),
                    timeTo: dates.endDate.valueOf()
                })
            });
            setResponse([...response, res]);
        } catch (err) {
            setAsync({ isLoading: false, error: err });
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setKeywords([...keywords, e.target.value]);
            loadAnalytics(e.target.value);
            setSearchQuery('');
        }
    }

    function handleDelete(index) {
        setKeywords([
            ...keywords.slice(0, index),
            ...keywords.slice(index + 1)
        ]);
        setResponse([
            ...response.slice(0, index),
            ...response.slice(index + 1)
        ]);
        setSearchQuery('');
    }

    function renderKeyWords() {
        if (!keywords.length) {
            return null;
        }
        return keywords.map((keyword, index) => (
            <Chip
                variant="outlined"
                color={index === 0 ? 'primary' : 'secondary'}
                label={keyword}
                onDelete={() => handleDelete(index)}
            />
        ));
    }

    return (
        <Grid container justify="center" style={{ marginTop: 20 }}>
            <Grid item xs={10} md={4} xl={2}>
                <Grid container>
                    <Grid item xs={12}>
                        <DatePicker dates={dates} handleDateChange={setDates} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Suchbegriff"
                            type="search"
                            onKeyPress={handleKeyPress}
                            margin="normal"
                            variant="outlined"
                            value={searchQuery}
                            fullWidth
                            onChange={e => setSearchQuery(e.target.value)}
                            disabled={
                                keywords.length === 2 ||
                                dates.startDate === null ||
                                dates.endDate === null
                            }
                            InputLabelProps={{ zIndex: 0 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {renderKeyWords()}
                    </Grid>
                    <Grid item xs={12}>
                        <Chart data={response} async={async} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default Analytics;
