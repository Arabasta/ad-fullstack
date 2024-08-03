import React, { useEffect, useState } from 'react';
import Header from "../components/pageSections/headers/Header";
import RecommendedPortfolioType from "../components/elements/alerts/info/RecommendedPortfolioTypeInfoAlert";
import ProfileButtons from "../components/elements/buttons/ProfileButtons";
import Footer from "../components/pageSections/footers/Footer";
import CustomerDetailsCard from "../components/elements/cards/CustomerDetailsCard";
import CustomerService from "../services/CustomerService";

const ProfilePage = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await CustomerService.getCustomer()
                setCustomer(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, []);

    if (loading) {
        return <p>Loading customer details...</p>;
    }

    return (
        <div>
            <Header/>
            <h2>Profile</h2>
            <p>Welcome to the Profile Page!</p>

            <CustomerDetailsCard customer={customer} />

            <RecommendedPortfolioType/>
            <ul className="nav">
                <ProfileButtons to="/profile/account" label="Update Email and Password"/>
                <ProfileButtons to="/profile/financialProfile" label="Update Financial Profile"/>
                <ProfileButtons to="/profile/address" label="Update Address"/>
                <ProfileButtons to="/profile/investorProfile" label="Update Investor Profile"/>
                <ProfileButtons to="/profile/notification" label="Notification Settings"/>
            </ul>

            <Footer/>
        </div>
    );
}

export default ProfilePage;
