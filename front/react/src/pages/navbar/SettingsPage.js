import React from 'react';
import SettingsButton from "../../components/common/buttons/SettingsPageButtons";

export default function SettingsPage() {
    return (
        <div>
            <h2>Settings</h2>
            <p>Welcome to the settings page! For Test Only</p>
            <ul className="nav">
                <SettingsButton to="/settings/account" label="Account" />
                <SettingsButton to="/settings/financialProfile" label="Financial Profile" />
                <SettingsButton to={"/settings/address"} label={"Address"} />
                <SettingsButton to="/settings/preferenceForm" label="Preference Form" />
                <SettingsButton to="/settings/notification" label="Notifications" />
            </ul>
        </div>
    );
}


