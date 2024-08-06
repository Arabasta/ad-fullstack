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

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return { users, getUsers };
};

export default useUsers;
