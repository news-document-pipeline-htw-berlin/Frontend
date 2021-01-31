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
import { wording } from '../common/common';

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
                    title={wording.user.manageData}
                />
                <form validate onSubmit={data} autoComplete="off">
                    <FieldRow
                        required="true"
                        type="password"
                        text={wording.auth.password}
                        handleChange={e =>
                            setAuthRequest({
                                ...authRequest,
                                password: e.target.value
                            })
                        }
                    />
                    <ButtonRow
                        label={wording.user.deleteData}
                        variant="outlined"
                        color="secondary"
                    />
                    <SubtitleRow right={wording.user.deleteDataCaption} />
                </form>
                <form validate onSubmit={account} autoComplete="off">
                    <FieldRow
                        required="true"
                        type="password"
                        text={wording.auth.password}
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
                        text={wording.user.confirm}
                        onClick={() => setConfirm(true)}
                    />
                    <ButtonRow
                        label={wording.user.deleteAccount}
                        variant="contained"
                        color="secondary"
                    />
                    <SubtitleRow right={wording.user.deleteAccountWarn} />
                </form>
            </div>
        </ElementContainer>
    );
}

Data.propTypes = {
    userData: PropTypes.object.isRequired,
    setFeedback: PropTypes.func.isRequired
};
