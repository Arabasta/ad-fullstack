import React from 'react';
import ProfileButtons from "../components/elements/buttons/ProfileButtons";

export default function SettingsPage() {
    return (
        <div>
            <h2>Settings</h2>
            <p>Welcome to the settings page! For Test Only</p>
            <ul className="nav">
                <ProfileButtons to="/settings/account" label="Account" />
                <ProfileButtons to="/settings/financialProfile" label="Financial Profile" />
                <ProfileButtons to={"/settings/address"} label={"Address"} />
                <ProfileButtons to="/settings/preferenceForm" label="Preference Form" />
                <ProfileButtons to="/settings/notification" label="Notifications" />
            </ul>
        </div>
    );
}


