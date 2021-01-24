import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom';
import { DeleteData, DeleteAccount } from './UserService';
import {
    TitleRow,
    ElementContainer,
    CheckboxRow,
    FieldRow,
    ButtonRow,
    SubtitleRow
} from './profileElements';

function Data({ userData, setUserData }) {
    const [customAlert, setCustomAlert] = useState(null);
    const [authRequest, setAuthRequest] = useState({
        user: userData.username,
        password: ''
    });
    const [confirm, setConfirm] = useState(false);
    const history = useHistory();

    const deleteAccount = e => {
        e.preventDefault();
        DeleteAccount(authRequest, setCustomAlert, history);
    };
    const deleteData = e => {
        e.preventDefault();
        DeleteData(authRequest, setCustomAlert);
    };

    return (
        <ElementContainer customAlert={customAlert}>
            <div>
                <TitleRow
                    icon={<SaveIcon fontSize="large" />}
                    title="Manage Data"
                />
                <form validate onSubmit={deleteData} autoComplete="off">
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
                <form validate onSubmit={deleteAccount} autoComplete="off">
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
    setUserData: PropTypes.func.isRequired
};

export default Data;
