import React, { useEffect, useState, useCallback } from 'react';
import UpdatePassword from "../../components/user/UserUpdatePassword";
import UpdateEmail from "../../components/user/UserUpdateEmail";
import useUser from "../../hooks/useUser";

const AccountPage = () => {
    const { user, getUserDetails } = useUser();
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            await getUserDetails();
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }, [getUserDetails]);

    useEffect(() => {
            fetchData();
    }, [fetchData]);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Account Settings</h2>
            {user && <UpdateEmail user={user} onUpdate={fetchData} />}
            {user && <UpdatePassword user={user} onUpdate={fetchData} />}
        </div>
    );
};

export default AccountPage;
