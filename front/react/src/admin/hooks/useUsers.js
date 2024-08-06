import { useState, useEffect, useCallback } from 'react';
import ManageUsersService from "../services/ManageUsersService";

const useUsers = (search = '') => {
    const [users, setUsers] = useState([]);

    const getUsers = useCallback(async () => {
        try {
            const response = await ManageUsersService.getUsers(search);
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users data', error);
        }
    }, [search]);

    const lockUser = useCallback(async (username) => {
        try {
            await ManageUsersService.lockUser(username);
            await getUsers(); // Refresh the users list after locking a user
        } catch (error) {
            console.error('Error locking user', error);
        }
    }, [getUsers]);

    const unlockUser = useCallback(async (username) => {
        try {
            await ManageUsersService.unlockUser(username);
            await getUsers(); // Refresh the users list after unlocking a user
        } catch (error) {
            console.error('Error unlocking user', error);
        }
    }, [getUsers]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return { users, getUsers, lockUser, unlockUser };
};

export default useUsers;
