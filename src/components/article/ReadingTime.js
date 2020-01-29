import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const ReadingTime = ({ readingTime }) => {
    if (!readingTime) {
        return null;
    }
    return (
        <React.Fragment>
            <Typography paragraph>
                <FontAwesomeIcon
                    style={{ marginRight: 5 }}
                    icon={faClock}
                    color="#009688"
                />
                {`Lesezeit: ${readingTime} Minuten`}
            </Typography>
        </React.Fragment>
    );
};

ReadingTime.propTypes = {
    readingTime: PropTypes.number.isRequired
};

export default ReadingTime;
