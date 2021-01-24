import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UpdateUserData } from './UserService';
import {
    TitleRow,
    ElementContainer,
    TextRow,
    FieldRow,
    ButtonRow
} from './profileElements';

function EditProfile({ userData, setUserData }) {
    const [customAlert, setCustomAlert] = useState(null);
    const handleSubmit = e => {
        e.preventDefault();
        UpdateUserData(userData, customAlert, setCustomAlert);
    };

    return (
        <ElementContainer customAlert={customAlert}>
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
    setUserData: PropTypes.func.isRequired
};

export default EditProfile;
