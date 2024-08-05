import AdminViewUsersPage from "../pages/AdminViewUsersPage";
import {Route} from "react-router-dom";
import BackTestPage from "../pages/BacktestPage";

const adminRoutes = [
    <Route key="account" path="/admin/manage-user" element={<AdminViewUsersPage />} />,
    <Route key="backTest" path="/admin/backtest" element={<BackTestPage />} />,

];

export default adminRoutes;