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
            setKeywords([...keywords, query]);
            setAsync({ isLoading: false, error: null });
        } catch (err) {
            setAsync({ isLoading: false, error: err });
        }
    }

    function handleKeyPress(e) {
        const { value } = e.target;
        if (e.key === 'Enter') {
            loadAnalytics(value);
            setSearchQuery('');
        }
    }

    function handleChange(e) {
        if (async.error) {
            setAsync({ ...async, error: null });
        }
        setSearchQuery(e.target.value);
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

    function renderHelperText() {
        if (async.error) {
            return 'Suchbegriff nicht gefunden';
        }
        if (keywords.length === 0 && (!dates.startDate || !dates.endDate)) {
            return 'Bitte wähle zuerst eine Datumsspanne aus.';
        }
        if (keywords.length === 2) {
            return 'Maximale Anzahl der Suchebegriffe erreicht.';
        }
        return '';
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
                            error={async.error}
                            helperText={renderHelperText()}
                            onKeyPress={handleKeyPress}
                            variant="outlined"
                            value={searchQuery}
                            fullWidth
                            onChange={handleChange}
                            disabled={
                                keywords.length === 2 ||
                                dates.startDate === null ||
                                dates.endDate === null
                            }
                            InputLabelProps={{ style: { zIndex: 0 } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {renderKeyWords()}
                    </Grid>
                    <Grid item xs={12} justify="center">
                        <Chart data={response} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default Analytics;
