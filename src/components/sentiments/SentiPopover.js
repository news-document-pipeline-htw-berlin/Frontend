import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Paper } from '@material-ui/core';

import SentiScore from './SentiScore';
import { wording } from '../common/common';
import { EVAL } from './sentiEval';

/**
 * A popover element containing the weekday, amount of articles and correspinding SentScore.
 * @param {*} param0 value
 */
export default function SentiPopover({ value }) {
    return (
        <Paper elevation={3} style={{ padding: '10px' }}>
            <Typography>{value.day}</Typography>
            <Typography>
                {wording.article.articles}: {value.count}
            </Typography>
            {value.sent && (
                <div>
                    <Typography>
                        Sentiment:{' '}
                        {`${Number(value.sent).toFixed(2)} (${
                            EVAL[Math.round(value.sent) - 1]
                        })`}
                    </Typography>
                    <SentiScore senti={value.sent} />
                </div>
            )}
        </Paper>
    );
}

SentiPopover.propTypes = {
    value: PropTypes.object.isRequired
};
