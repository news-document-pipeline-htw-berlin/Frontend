import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import SaveIcon from '@material-ui/icons/Save';

import { deleteData, deleteAccount } from './UserService';
import {
    TitleRow,
    ElementContainer,
    CheckboxRow,
    FieldRow,
    ButtonRow,
    SubtitleRow
} from './profileElements';

/**
 * A panel which includes functionalities to delete user data / the user account.
 * @param {*} param0
 */
export default function Data({ userData, setFeedback }) {
    const [authRequest, setAuthRequest] = useState({
        user: userData.username,
        password: ''
    });
    const [confirm, setConfirm] = useState(false);
    const history = useHistory();

    const account = e => {
        e.preventDefault();
        deleteAccount(authRequest, setFeedback, history);
    };

    const data = e => {
        e.preventDefault();
        deleteData(authRequest, setFeedback);
    };

    return (
        <ElementContainer>
            <div>
                <TitleRow
                    icon={<SaveIcon fontSize="large" />}
                    title="Manage Data"
                />
                <form validate onSubmit={data} autoComplete="off">
                    <FieldRow
                        required="true"
                        type="password"
                        text="Enter Password"
                        handleChange={e =>
                            setAuthRequest({
                                ...authRequest,
                                password: e.target.value
                            })
                        }
                    />
                    <ButtonRow
                        label="Delete My Data"
                        variant="outlined"
                        color="secondary"
                    />
                    <SubtitleRow right="All of your collected data will be deleted. This will impact your suggested articles." />
                </form>
                <form validate onSubmit={account} autoComplete="off">
                    <FieldRow
                        required="true"
                        type="password"
                        text="Enter Password"
                        handleChange={e =>
                            setAuthRequest({
                                ...authRequest,
                                password: e.target.value
                            })
                        }
                    />
                    <CheckboxRow
                        required="true"
                        color="secondary"
                        text="Yes, delete my account forever"
                        onClick={() => setConfirm(true)}
                    />
                    <ButtonRow
                        label="Delete My Account"
                        variant="contained"
                        color="secondary"
                    />
                    <SubtitleRow right="Warning! This cannot be undone." />
                </form>
            </div>
        </ElementContainer>
    );
}

Data.propTypes = {
    userData: PropTypes.object.isRequired,
    setFeedback: PropTypes.func.isRequired
};
