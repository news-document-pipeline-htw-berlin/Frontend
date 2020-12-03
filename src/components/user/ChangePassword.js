import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UpdateUserData } from '../../services/UserService';

export default function ChangePassword({
    userData,
    setUserData,
    open,
    setOpen
}) {
    const [password, setPassword] = useState({ old: '', new: '', repeat: '' });
    const handleClose = () => {
        setOpen(false);
    };

    const savePassword = () => {
        // TODO: validate passwords
        setUserData({ ...userData, password: password.new });
        UpdateUserData(userData);
        handleClose();
    };

    return (
        <form validate onSubmit={savePassword}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Change Password
                </DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter Current Password"
                        type="password"
                        fullWidth
                        style={{ minWidth: '20vw' }}
                        onChange={e =>
                            setPassword({ ...password, old: e.target.value })
                        }
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter New Password"
                        type="password"
                        fullWidth
                        style={{ minWidth: '20vw' }}
                        onChange={e =>
                            setPassword({ ...password, new: e.target.value })
                        }
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Repeat New Password"
                        type="password"
                        fullWidth
                        style={{ minWidth: '20vw' }}
                        onChange={e =>
                            setPassword({ ...password, repeat: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={savePassword}
                        color="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}

ChangePassword.propTypes = {
    userData: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
};
