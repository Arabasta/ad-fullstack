import React from 'react';
import ProfileButtons from "../components/elements/buttons/ProfileButtons";

export default function SettingsPage() {
    return (
        <div>
            <h2>Settings</h2>
            <p>Welcome to the settings page! For Test Only</p>
            <ul className="nav">
                <ProfileButtons to="/profile/account" label="Account" />
                <ProfileButtons to="/profile/financialProfile" label="Financial Profile" />
                <ProfileButtons to="/profile/address" label={"Address"} />
                <ProfileButtons to="/profile/investorProfile" label="Preference Form" />
                <ProfileButtons to="/profile/notification" label="Notifications" />
            </ul>
        </div>
    );
}


