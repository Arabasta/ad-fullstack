import React from 'react';
import Header from "../components/pageSections/headers/Header";
import CustomerName from "../components/common/CustomerName";
import RecommendedPortfolioType from "../components/elements/alerts/info/RecommendedPortfolioType";
import ProfileButtons from "../components/elements/buttons/ProfileButtons";
import Footer from "../components/pageSections/footers/Footer";


const ProfilePage = () => {
    return (
        <div>
            <h2>Profile</h2>
            <p>Welcome to the Profile Page!</p>

            <CustomerName />

            <RecommendedPortfolioType />
            <ul className="nav">
                <ProfileButtons to="/profile/account" label="Update Email and Password"/>
                <ProfileButtons to="/profile/financialProfile" label="Update Financial Profile"/>
                <ProfileButtons to="/profile/address" label="Update Address"/>
                <ProfileButtons to="/profile/investorProfile" label="Update Investor Profile"/>
                <ProfileButtons to="/profile/notification" label="Notification Settings"/>
            </ul>

            <Footer />
        </div>
    );
}

export default ProfilePage;
