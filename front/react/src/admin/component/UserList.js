import React, { useState } from 'react';
import useUsers from '../hooks/useUsers';

const UserList = () => {
    const [search, setSearch] = useState('');
    const { users, lockUser, unlockUser } = useUsers(search);
    const [message, setMessage] = useState({});

    const handleLock = async (username) => {
        await lockUser(username);
        setMessage((prevState) => ({
            ...prevState,
            [username]: 'User locked successfully',
        }));
    };

    const handleUnlock = async (username) => {
        await unlockUser(username);
        setMessage((prevState) => ({
            ...prevState,
            [username]: 'User unlocked successfully',
        }));
    };

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users"
            />
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                    <th>Message</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.username}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => handleLock(user.username)}>Lock</button>
                            <button onClick={() => handleUnlock(user.username)}>Unlock</button>
                        </td>
                        <td>{message[user.username]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
