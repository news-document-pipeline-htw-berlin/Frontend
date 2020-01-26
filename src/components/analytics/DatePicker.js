import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';
import deLocale from 'moment/locale/de';
import moment from 'moment';

const DatePicker = ({ dates, handleDateChange }) => {
    const [focusedInput, setFocusedInput] = useState(null);

    moment.locale('de', deLocale);

    return (
        <DateRangePicker
            keepOpenOnDateSelect
            startDate={dates.startDate}
            startDatePlaceholderText="Startdatum"
            endDatePlaceholderText="Enddatum"
            endDate={dates.endDate}
            onDatesChange={({ startDate, endDate }) =>
                handleDateChange({ startDate, endDate })
            }
            isOutsideRange={() => false}
            focusedInput={focusedInput}
            onFocusChange={input => setFocusedInput(input)}
            displayFormat="DD-MM-YYYY"
        />
    );
};

DatePicker.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    dates: PropTypes.instanceOf(moment).isRequired
};

export default DatePicker;
