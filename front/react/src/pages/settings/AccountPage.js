import React from 'react';
import useUser from '../../hooks/useUser';
import UserUpdatePassword from "../../components/user/UserUpdatePassword";
import UserUpdateEmail from "../../components/user/UserUpdateEmail";

const AccountPage = () => {
    const { user, loading, getUser } = useUser();  // 获取 loading 状态

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Account Settings</h2>
            {user ? (
                <>
                    <UserUpdateEmail user={user} />
                    <UserUpdatePassword user={user} />
                </>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default AccountPage;

