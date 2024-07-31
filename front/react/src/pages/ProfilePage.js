import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
    // Use the AuthContext to access the user and logout function
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h2>Profile</h2>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>Please log in.</p>
            )}
        </div>
    );
};

export default ProfilePage;
