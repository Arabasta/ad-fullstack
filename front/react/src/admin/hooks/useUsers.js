import { useState, useEffect } from 'react';
import ManageUsersService from "../services/ManageUsersService";

const useUsers = (search = '') => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await ManageUsersService.getUsers(search);
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users data', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [search]);

    return { users, getUsers };
};

export default useUsers;
