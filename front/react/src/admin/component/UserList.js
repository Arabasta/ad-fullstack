import React, { useState } from 'react';
import useUsers from '../hooks/useUsers';

const UserList = () => {
    const [search, setSearch] = useState('');
    const { users } = useUsers(search);

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
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.username}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
