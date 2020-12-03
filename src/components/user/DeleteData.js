import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteData({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Delete My Data</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    By confirming this action, all of the collected data linked
                    to your account will be deleted. This includes your reading
                    preferences and will influence the quality of suggested
                    articles.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleClose}
                    color="primary"
                    variant="contained"
                    autoFocus
                >
                    Delete all Data
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteData.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};

export default DeleteData;
