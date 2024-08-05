import AdminViewUsersPage from "../pages/AdminViewUsersPage";
import {Route} from "react-router-dom";

const adminRoutes = [
    <Route key="account" path="/admin/manage-user" element={<AdminViewUsersPage />} />,


];

export default adminRoutes;