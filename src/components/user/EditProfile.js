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
import { wording } from '../common/common';

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
                    title={`${userData.username}'s ${wording.user.account}`}
                />
                <TextRow
                    leftText={wording.auth.username}
                    rightText={userData.username}
                />
                <FieldRow
                    text={wording.auth.email}
                    value={userData.email}
                    required="true"
                    type="email"
                    handleChange={e =>
                        setUserData({ ...userData, email: e.target.value })
                    }
                />
                <ButtonRow
                    label={wording.user.save}
                    variant="contained"
                    color="primary"
                />
            </form>
        </ElementContainer>
    );
}

EditProfile.propTypes = {
    userData: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
    setFeedback: PropTypes.func.isRequired
};
