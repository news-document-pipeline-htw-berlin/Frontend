import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';
import { UpdateUserData } from '../../services/UserService';
import {
    TitleRow,
    ElementContainer,
    SubtitleRow,
    SwitchRow
} from './profileElements';

function Preferences({ userData, setUserData }) {
    const [customAlert, setCustomAlert] = useState(null);
    const handleSwitch = e => {
        e.preventDefault();
        UpdateUserData(userData, customAlert, setCustomAlert);
    };

    return (
        <ElementContainer customAlert={customAlert}>
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
                        handleSwitch(e);
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
                        setUserData({
                            ...userData,
                            darkMode: !userData.darkMode
                        });
                        handleSwitch(e);
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
    setUserData: PropTypes.func.isRequired
};

export default Preferences;
