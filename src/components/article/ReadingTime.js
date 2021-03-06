import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const ReadingTime = ({ readingTime }) => {
    if (!readingTime) {
        return null;
    }
    let t = readingTime / 60;
    t = t < 1 ? Number(t).toFixed(2) : Number(t).toFixed(0);
    return (
        <React.Fragment>
            <Typography paragraph>
                <FontAwesomeIcon
                    style={{ marginRight: 5 }}
                    icon={faClock}
                    color="#009688"
                />
                {`Lesezeit: ${Math.round(readingTime / 60)} Minute${
                    t > 1 ? 'n' : ''
                }`}
            </Typography>
        </React.Fragment>
    );
};

ReadingTime.propTypes = {
    readingTime: PropTypes.number.isRequired
};

export default ReadingTime;
