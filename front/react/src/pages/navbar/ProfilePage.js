import React from 'react';
import SettingsButton from "../../components/navigation/navBar/navLinks/ProfileButtons";

export default function ProfilePage() {
    return (
        <div>
            <h2>Profile</h2>
            <p>Welcome to the Profile Page! For Test Only</p>


            <ul className="nav">
                <SettingsButton to="/profile/account" label="Update Email and Password" />
                <SettingsButton to="/profile/financialProfile" label="Update Financial Profile" />
                <SettingsButton to={"/profile/address"} label={"Update Address"} />
                <SettingsButton to="/profile/preferenceForm" label="Update Investor Profile" />
                <SettingsButton to="/profile/notification" label="Notifications" />
            </ul>
        </div>
    );
}

