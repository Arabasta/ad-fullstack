import React from 'react';
import SettingsButtons from "../../components/common/buttons/SettingsButtons";


export default function SettingsPage() {
    return (
        <div>
            <h2>Settings</h2>
            <p>Welcome to the settings page! For Test Only</p>
            <SettingsButtons to="/settings/account" label="Account" />
            <SettingsButtons to="/settings/financialProfile" label="Financial Profile" />
            <SettingsButtons to="/settings/preferenceForm" label="Preference Form" />
            <SettingsButtons to="/settings/notification" label="Notifications" />
            <SettingsButtons to="/logout" label="Logout" />
        </div>
    );
}

