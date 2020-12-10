import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';

const leftStyle = { textAlign: 'right', paddingRight: '10px' };
const rightStyle = { textAlign: 'left', paddingLeft: '10px' };

export const ElementContainer = props => {
    const { children, customAlert } = props;
    return (
        <div style={{ width: '40vw' }}>
            <Grid container direction="column">
                {customAlert && (
                    <Alert severity={customAlert.severity}>
                        {customAlert.message}
                    </Alert>
                )}
                {children}
            </Grid>
        </div>
    );
};

ElementContainer.propTypes = {
    children: PropTypes.node.isRequired,
    customAlert: PropTypes.object.isRequired
};

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
            <Grid item xs={4} style={leftStyle}>
                {left}
            </Grid>
            <Grid item xs={6} style={rightStyle}>
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
                    fullWidth
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
