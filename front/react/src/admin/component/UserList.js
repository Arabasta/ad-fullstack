import React, { useState } from 'react';
import useUsers from '../hooks/useUsers';
import ModalList from '../../components/common/modal/ModalList';
import ModalListItem from '../../components/common/modal/ModalListItem';
import Button from '../../components/common/buttons/Button';
import BlackText from '../../components/common/text/BlackText';
import SearchInput from "../../components/common/inputFields/SearchInput";
import UserMessage from "../../components/common/alerts/UserMessage";


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
            <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users"
            />
            <ModalList>
                {users.map((user) => (
                    <ModalListItem key={user.username}>
                        <BlackText variant="h5">{user.username}</BlackText>
                        <BlackText variant="p">{user.email}</BlackText>
                        <BlackText variant="p">{user.role}</BlackText>
                        <div>
                            <Button onClick={() => handleLock(user.username)}>Lock</Button>
                            <Button onClick={() => handleUnlock(user.username)}>Unlock</Button>
                        </div>
                        <UserMessage message={message[user.username]} />
                    </ModalListItem>
                ))}
            </ModalList>
        </div>
    );
};

export default UserList;
