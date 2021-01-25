import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import SettingsIcon from '@material-ui/icons/Settings';

import { updateUserData } from './UserService';
import {
    TitleRow,
    ElementContainer,
    SubtitleRow,
    SwitchRow
} from './profileElements';
import { setDarkModeToken } from '../auth/JWT';

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
            setDarkModeToken();
            updateUserData(userData, setFeedback);
        }
    }, [setFeedback, userData]);

    return (
        <ElementContainer>
            <div>
                <TitleRow
                    icon={<SettingsIcon fontSize="large" />}
                    title="Preferences"
                />
                <SwitchRow
                    title="Article Suggestions"
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
                            ? 'New articles will be suggested to you.'
                            : 'New articles will not be suggested to you.'
                    }
                />
                <SwitchRow
                    title="Dark Mode"
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
                            ? 'Dark Mode is enabled.'
                            : 'Dark Mode is disabled.'
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
