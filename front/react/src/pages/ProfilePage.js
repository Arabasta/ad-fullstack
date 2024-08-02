import React from 'react';
import SettingsButton from "../../components/navigation/navBar/navLinks/ProfileButtons";
import RecommendedPortfolioType from "../../components/elements/alerts/info/RecommendedPortfolioType";
import CustomerName from "../../components/common/CustomerName";
import Header2 from "../../components/pageSections/headers/Header2";
import Footer2 from "../../components/pageSections/footers/Footer2";

const ProfilePage = () => {
    return (
        <div>
            <Header2/>
            <h2>Profile</h2>
            <p>Welcome to the Profile Page!</p>

            <CustomerName/>

            <RecommendedPortfolioType/>

            <ul className="nav">
                <SettingsButton to="/profile/account" label="Update Email and Password"/>
                <SettingsButton to="/profile/financialProfile" label="Update Financial Profile"/>
                <SettingsButton to="/profile/address" label="Update Address"/>
                <SettingsButton to="/profile/preferenceForm" label="Update Investor Profile"/>
                <SettingsButton to="/profile/notification" label="Notifications"/>
            </ul>

            <Footer2/>
        </div>
    );
}

export default ProfilePage;
