import React from 'react';
import PropTypes from 'prop-types';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { updateUserData } from './UserService';
import {
    TitleRow,
    ElementContainer,
    TextRow,
    FieldRow,
    ButtonRow
} from './profileElements';
import Feedback from '../common/Feedback';

/**
 * A panel containing username and a functionality to change the email.
 * @param {*} param0
 */
export default function EditProfile({ userData, setUserData, setFeedback }) {
    const handleSubmit = e => {
        e.preventDefault();
        updateUserData(userData, setFeedback);
    };

    return (
        <ElementContainer>
            <form validate onSubmit={handleSubmit} autoComplete="off">
                <TitleRow
                    icon={<AccountCircleIcon fontSize="large" />}
                    title={`${userData.username}'s Account`}
                />
                <TextRow leftText="Username" rightText={userData.username} />
                <FieldRow
                    text="Email"
                    value={userData.email}
                    required="true"
                    type="email"
                    handleChange={e =>
                        setUserData({ ...userData, email: e.target.value })
                    }
                />
                <ButtonRow label="Save" variant="contained" color="primary" />
            </form>
        </ElementContainer>
    );
}

EditProfile.propTypes = {
    userData: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
    setFeedback: PropTypes.func.isRequired
};
