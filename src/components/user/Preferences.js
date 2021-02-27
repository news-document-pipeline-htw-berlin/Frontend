import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import SettingsIcon from '@material-ui/icons/Settings';

import { updateUserData } from './UserService';
import {
    TitleRow,
    ElementContainer,
    SubtitleRow,
    SwitchRow
} from './profileElements';
import { setDarkModeToken, setSuggestToken } from '../auth/JWT';
import { wording } from '../common/common';

/**
 * A panel containing switches to update user's preferences.
 * @param {*} param0
 */
function Preferences({ userData, setUserData, setDarkState, setFeedback }) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setDarkModeToken(userData.darkMode);
            setSuggestToken(userData.suggestions);
            updateUserData(userData, setFeedback);
        }
    }, [setFeedback, userData]);

    return (
        <ElementContainer>
            <div>
                <TitleRow
                    icon={<SettingsIcon fontSize="large" />}
                    title={wording.user.preferences}
                />
                <SwitchRow
                    title={wording.user.suggestions}
                    switchState={userData.suggestions}
                    handleClick={e => {
                        setUserData({
                            ...userData,
                            suggestions: !userData.suggestions
                        });
                    }}
                />
                <SubtitleRow
                    right={
                        userData.suggestions
                            ? wording.user.doSuggest
                            : wording.user.notSuggest
                    }
                />
                <SwitchRow
                    title={wording.user.darkMode}
                    switchState={userData.darkMode}
                    handleClick={e => {
                        setDarkState(!userData.darkMode);
                        setUserData({
                            ...userData,
                            darkMode: !userData.darkMode
                        });
                    }}
                />
                <SubtitleRow
                    right={
                        userData.darkMode
                            ? wording.user.doDarkMode
                            : wording.user.notDarkMode
                    }
                />
            </div>
        </ElementContainer>
    );
}

Preferences.propTypes = {
    userData: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
    setDarkState: PropTypes.func.isRequired,
    setFeedback: PropTypes.func.isRequired
};

export default Preferences;
