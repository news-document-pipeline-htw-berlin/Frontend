import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import deLocale from 'moment/locale/de';
import moment from 'moment';
import { wording } from '../common/common';

const DatePicker = ({ dates, handleDateChange }) => {
    const [focusedInput, setFocusedInput] = useState(null);

    moment.locale('de', deLocale);

    function isOutsideRange(day) {
        const today = moment();
        const { startDate } = dates;
        if (focusedInput === 'endDate') {
            return (
                isInclusivelyAfterDay(day, today) ||
                day.isBefore(startDate) ||
                day.isAfter(startDate && startDate.clone().add(90, 'days'))
            );
        }
        if (focusedInput === 'startDate') {
            return isInclusivelyAfterDay(day, today);
        }

        return false;
    }

    return (
        <DateRangePicker
            disabled={!dates.startDate ? 'endDate' : ''}
            noBorder
            minimumNights={7}
            startDate={dates.startDate}
            endDate={dates.endDate}
            startDatePlaceholderText={wording.analytics.startDate}
            endDatePlaceholderText={wording.analytics.endDate}
            onDatesChange={({ startDate, endDate }) =>
                handleDateChange({ startDate, endDate })
            }
            isOutsideRange={isOutsideRange}
            focusedInput={focusedInput}
            onFocusChange={input => setFocusedInput(input)}
        />
    );
};

DatePicker.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    dates: PropTypes.instanceOf(moment).isRequired
};

export default DatePicker;
