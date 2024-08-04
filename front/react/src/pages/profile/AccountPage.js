import React from 'react';
import UpdatePassword from "../../components/user/UserUpdatePassword";
import UpdateEmail from "../../components/user/UserUpdateEmail";
import useUser from "../../hooks/useUser";

const AccountPage = () => {
    const { user, updateUser, loading } = useUser();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Account Settings</h2>
            <p>{user.email}</p>
            <UpdateEmail user={user} updateUser={updateUser} />
            <UpdatePassword user={user} updateUser={updateUser} />
        </div>
    );
};

export default AccountPage;
