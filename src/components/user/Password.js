import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LockIcon from '@material-ui/icons/Lock';

import { changePassword } from './UserService';
import {
    TitleRow,
    ElementContainer,
    FieldRow,
    ButtonRow
} from './profileElements';
import { wording } from '../common/common';

/**
 * Displays a panel with the functionality to change the user's password.
 * @param {*} param0
 */
function Password({ userData, setFeedback }) {
    const [password, setPassword] = useState({
        user: userData.username,
        oldPW: '',
        newPW: '',
        repPW: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        changePassword(password, setFeedback);
    };

    return (
        <ElementContainer>
            <form validate onSubmit={handleSubmit} autoComplete="off">
                <TitleRow
                    icon={<LockIcon fontSize="large" />}
                    title={wording.user.changePW}
                />
                <FieldRow
                    text={wording.user.currentPW}
                    required="true"
                    type="password"
                    handleChange={e =>
                        setPassword({
                            ...password,
                            oldPW: e.target.value
                        })
                    }
                />
                <FieldRow
                    text={wording.user.newPW}
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
                    text={wording.user.repeatPW}
                    required="true"
                    type="password"
                    handleChange={e =>
                        setPassword({
                            ...password,
                            repPW: e.target.value
                        })
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

Password.propTypes = {
    userData: PropTypes.object.isRequired,
    setFeedback: PropTypes.func.isRequired
};

export default Password;
