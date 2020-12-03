import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UpdateUserData } from '../../services/UserService';

export default function ChangeEmail({ userData, setUserData, open, setOpen }) {
    const [email, setEmail] = useState('');
    const handleClose = () => {
        setOpen(false);
    };

    const saveEmail = e => {
        e.preventDefault();
        setUserData({ ...userData, email });
        UpdateUserData(userData);
        handleClose();
    };

    return (
        <div>
            <form validate onSubmit={saveEmail}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Change Email Address
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Current: {userData.email}
                        </DialogContentText>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter new Email Address"
                            type="email"
                            fullWidth
                            style={{ minWidth: '20vw' }}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={saveEmail}
                            color="primary"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
}

ChangeEmail.propTypes = {
    userData: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};
