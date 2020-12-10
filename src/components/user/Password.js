import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/Lock';
import { ChangePassword } from '../../services/UserService';
import {
    TitleRow,
    ElementContainer,
    FieldRow,
    ButtonRow
} from './profileElements';

function Password({ userData, setUserData }) {
    const [customAlert, setCustomAlert] = useState(null);
    const [password, setPassword] = useState(null);
    const handleSubmit = e => {
        e.preventDefault();
        ChangePassword(
            userData,
            setUserData,
            password,
            customAlert,
            setCustomAlert
        );
    };

    return (
        <ElementContainer customAlert={customAlert}>
            <form validate onSubmit={handleSubmit} autoComplete="off">
                <TitleRow
                    icon={<LockIcon fontSize="large" />}
                    title="Change Password"
                />
                <FieldRow
                    text="Current Password"
                    required="true"
                    type="password"
                    handleChange={e =>
                        setPassword({ ...password, current: e.target.value })
                    }
                />
                <FieldRow
                    text="New Password"
                    required="true"
                    type="password"
                    handleChange={e =>
                        setPassword({
                            ...password,
                            newPassword: e.target.value
                        })
                    }
                />
                <FieldRow
                    text="Confirm Password"
                    required="true"
                    type="password"
                    handleChange={e =>
                        setPassword({ ...password, confirm: e.target.value })
                    }
                />
                <ButtonRow label="Save" variant="contained" color="primary" />
            </form>
        </ElementContainer>
    );
}

Password.propTypes = {
    userData: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired
};

export default Password;
