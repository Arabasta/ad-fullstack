import React from 'react';
import UserList from '../component/UserList';
import Heading from "../../components/common/text/Heading";


const AdminPage = () => {
    return (
        <div>
            <Heading variant="h1">Manage Users</Heading>
            <UserList />
        </div>
    );
};

export default AdminPage;
