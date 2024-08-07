import React from 'react';
import {Route} from "react-router-dom";
import EditProfilePage from "../pages/settings/profile/EditProfileMain";
import EditBankPage from "../pages/settings/bank/editBankDetails";
import EditNotificationsPage from "../pages/settings/notifications/editNotifications";
import EditUserDetails from "../pages/settings/profile/sub-profile/EditUserDetails";
import EditAddressDetails from "../pages/settings/profile/sub-profile/EditAddressDetails";
import EditFinancialProfile from "../pages/settings/profile/sub-profile/EditFinancialProfile";
import EditInvestorProfile from "../pages/settings/profile/sub-profile/EditInvestorProfile";
import EditBankDetails from "../pages/settings/bank/editBankDetails";
import EditNotifications from "../pages/settings/notifications/editNotifications";
import EditPasswordDetails from "../pages/settings/profile/sub-profile/EditPasswordDetails";

const settingRoutes = [
    /* Links on the main setting page */
    <Route key="profile" path="/settings/profile" element={<EditProfilePage />} />,
    <Route key="bank" path="/settings/bank" element={<EditBankPage />} />,
    <Route key="notifications" path="/settings/notifications" element={<EditNotificationsPage/>} />,

    /* sublinks of respective links from main setting page */
    <Route key="userDetails" path="/settings/profile/user" element={<EditUserDetails />} />,
    <Route key="passwordDetails" path="/settings/profile/password" element={<EditPasswordDetails />} />,
    <Route key="addressDetails" path="/settings/profile/address" element={<EditAddressDetails />} />,
    <Route key="financialProfile" path="/settings/profile/financialProfile" element={<EditFinancialProfile />} />,
    <Route key="investorProfile" path="/settings/profile/investorProfile" element={<EditInvestorProfile />} />,

    <Route key="bankDetails" path="/settings/profile/bankDetails" element={<EditBankDetails />} />,

    <Route key="notifications" path="/settings/profile/notification" element={<EditNotifications />} />

];

export default settingRoutes;