/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    Typography,
    TextField,
    Button,
    Switch,
    Checkbox
} from '@material-ui/core';

const leftStyle = { textAlign: 'right', paddingRight: '10px' };
const rightStyle = { textAlign: 'left', paddingLeft: '10px' };

/**
 * Container for a row.
 * @param {*} props
 */
export const ElementContainer = props => {
    const { children } = props;
    return (
        <div>
            <Grid container direction="column">
                {children}
            </Grid>
        </div>
    );
};

ElementContainer.propTypes = {
    children: PropTypes.node.isRequired
};

/**
 * A row with a left and right element.
 * @param {*} props
 */
const Row = props => {
    const { left, right } = props;
    return (
        <Grid
            container
            alignItems="flex-end"
            justify="center"
            direction="row"
            spacing={24}
            style={{ margin: '15px' }}
        >
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={leftStyle}>
                {left}
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={8} xl={8} style={rightStyle}>
                {right}
            </Grid>
        </Grid>
    );
};

Row.defaultProps = {
    left: null,
    right: null
};

Row.propTypes = {
    left: PropTypes.any,
    right: PropTypes.any
};

/**
 * A row with an icon on the left and title on the right.
 * @param {*} props
 */
export const TitleRow = props => {
    const { icon, title } = props;
    return (
        <Row
            left={icon}
            right={<Typography variant="h4">{title}</Typography>}
        />
    );
};

TitleRow.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
};

/**
 * A row with text on the left and on the right.
 * @param {*} props
 */
export const TextRow = props => {
    const { leftText, rightText } = props;
    return (
        <Row
            left={
                <Typography color="textSecondary" variant="h6">
                    {leftText}
                </Typography>
            }
            right={
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    {rightText}
                </Typography>
            }
        />
    );
};

TextRow.defaultProps = {
    leftText: '',
    rightText: ''
};

TextRow.propTypes = {
    leftText: PropTypes.string,
    rightText: PropTypes.string
};

/**
 * A row with text on the left and a textfield on the right.
 * @param {*} props
 */
export const FieldRow = props => {
    const { text, required, value, type, handleChange } = props;
    return (
        <Row
            left={
                <Typography color="textSecondary" variant="h6">
                    {text}
                </Typography>
            }
            right={
                <TextField
                    required={required}
                    value={value}
                    type={type}
                    onChange={handleChange}
                />
            }
        />
    );
};

FieldRow.defaultProps = {
    text: '',
    required: 'false',
    value: null,
    type: 'submit'
};

FieldRow.propTypes = {
    text: PropTypes.string,
    required: PropTypes.string,
    value: PropTypes.any,
    type: PropTypes.string,
    handleChange: PropTypes.func.isRequired
};

/**
 * A row with a checkbox on the left and text on the right.
 * @param {*} props
 */
export const CheckboxRow = props => {
    const { text, required, color, handleClick } = props;
    return (
        <Row
            left={
                <Checkbox
                    color={color}
                    required={required}
                    onClick={handleClick}
                    inputProps={{ 'aria-label': `${{ color }} checkbox` }}
                />
            }
            right={
                <Typography variant="overline" style={{ justify: 'center' }}>
                    {text}
                </Typography>
            }
        />
    );
};

CheckboxRow.defaultProps = {
    text: '',
    required: 'false',
    color: 'primary'
};

CheckboxRow.propTypes = {
    text: PropTypes.string,
    required: PropTypes.string,
    color: PropTypes.string,
    handleClick: PropTypes.func.isRequired
};

/**
 * A row with text on the left and a submit button on the right.
 * @param {*} props
 */
export const ButtonRow = props => {
    const { text, color, label, variant, handleSubmit } = props;
    return (
        <Row
            left={
                <Typography color="textSecondary" variant="h6">
                    {text}
                </Typography>
            }
            right={
                <Button type="submit" color={color} variant={variant}>
                    {label}
                </Button>
            }
        />
    );
};

ButtonRow.defaultProps = {
    text: '',
    color: 'primary',
    label: 'Button',
    variant: 'contained'
};

ButtonRow.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired
};

/**
 * A row with subtitles on both sides.
 * @param {*} props
 */
export const SubtitleRow = props => {
    const { left, right } = props;
    return (
        <Row
            left={<Typography variant="caption">{left}</Typography>}
            right={<Typography variant="caption">{right}</Typography>}
        />
    );
};

SubtitleRow.defaultProps = {
    left: null,
    right: null
};

SubtitleRow.propTypes = {
    left: PropTypes.any,
    right: PropTypes.any
};

/**
 * Row with a switch on the left and text on the right.
 * @param {*} props
 */
export const SwitchRow = props => {
    const { title, switchState, handleClick } = props;
    return (
        <Row
            left={
                (switchState || switchState === false) && (
                    <Switch
                        checked={switchState}
                        color="primary"
                        inputProps={{
                            'aria-label': 'secondary checkbox'
                        }}
                        onClick={handleClick}
                    />
                )
            }
            right={<Typography variant="h6">{title}</Typography>}
        />
    );
};

SwitchRow.propTypes = {
    title: PropTypes.string.isRequired,
    switchState: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
};
