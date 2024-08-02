import React from 'react';
import {Route} from "react-router-dom";
import WalletPage from "../pages/navbar/WalletPage";
import NewsPage from "../pages/NewsPage";
import SupportPage from "../pages/SupportPage";
import ProfilePage from "../pages/ProfilePage";


const mainRoutes = [
    <Route key="news" path="/news" element={<NewsPage/>} />,
    <Route key="support" path="/support" element={<SupportPage/>} />,
    <Route key="wallet" path="/wallet" element={<WalletPage />} />,
    <Route key="profile" path="/profile" element={<ProfilePage/>} />

];

export default mainRoutes;