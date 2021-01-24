import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/Lock';
import { ChangePassword } from './UserService';
import {
    TitleRow,
    ElementContainer,
    FieldRow,
    ButtonRow
} from './profileElements';

function Password({ userData, setUserData }) {
    const [customAlert, setCustomAlert] = useState(null);
    const [password, setPassword] = useState({
        user: userData.username,
        oldPW: '',
        newPW: '',
        repPW: ''
    });
    const handleSubmit = e => {
        e.preventDefault();
        ChangePassword(password, customAlert, setCustomAlert);
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
                        setPassword({ ...password, oldPW: e.target.value })
                    }
                />
                <FieldRow
                    text="New Password"
                    required="true"
                    type="password"
                    handleChange={e =>
                        setPassword({
                            ...password,
                            newPW: e.target.value
                        })
                    }
                />
                <FieldRow
                    text="Confirm Password"
                    required="true"
                    type="password"
                    handleChange={e =>
                        setPassword({ ...password, repPW: e.target.value })
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
