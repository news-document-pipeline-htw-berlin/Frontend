import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import SentiScore from '../article/SentiScore';

export default function SentiPopover({ value }) {
    return (
        <Paper elevation={3} style={{ padding: '10px' }}>
            <Typography>{value.day}</Typography>
            <Typography>Articles: {value.count}</Typography>
            {value.sent && (
                <div>
                    <Typography>Sentiment: {value.sent}</Typography>
                    <SentiScore senti={value.sent} />
                </div>
            )}
        </Paper>
    );
}

SentiPopover.propTypes = {
    value: PropTypes.object.isRequired
};
