import React, { useEffect, useState } from 'react';
import CustomerService from "../../services/CustomerService";
import InvestorProfileService from "../../services/InvestorProfileService";
import SettingPageGrid from "./SettingsPageGrid";

const SettingsPage = () => {
    const [customer, setCustomer] = useState(null);
    const [recommendedPortfolioType, setRecommendedPortfolioType] = useState('');

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await CustomerService.getCustomer();
                setCustomer(response.data);
            } catch (error) {
                // todo: include catch error, refer to toast or something
            }
        };

        const fetchInvestorProfile = async () => {
            try {
                const response = await InvestorProfileService.getInvestorProfile();
                const profileData = response.data.data;
                setRecommendedPortfolioType(profileData.recommendedPortfolioType);
            } catch (error) {
                // todo: include catch error, refer to toast or something
            }
        };
        fetchCustomerData();
        fetchInvestorProfile();
    }, []);

    return (
        <SettingPageGrid
            customer={customer}
            portfolioType={recommendedPortfolioType} />
    );}

export default SettingsPage;
