import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteAccount({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };

    const deleteAccount = e => {
        e.preventDefault();
        // TODO: delete account, log out
        handleClose();
    };

    return (
        <form validate onSubmit={deleteAccount}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete My Account
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By confirming this action, your account and all related
                        data will be deleted. This cannot be undone!
                    </DialogContentText>
                    <Checkbox
                        required
                        unChecked
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    Yes, delete my Account forever
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={deleteAccount}
                        color="secondary"
                        variant="contained"
                        autoFocus
                        type="submit"
                    >
                        Delete my Account
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}

DeleteAccount.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};

export default DeleteAccount;
