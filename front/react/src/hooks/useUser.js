import { useState, useEffect, useContext } from 'react';
import UserService from '../services/UserService';
import { AuthContext } from '../context/AuthContext';

const useUser = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    const getUserDetails = async () => {
        try {
            const response = await UserService.getUserDetails();
            setUser(response);
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            getUserDetails();
        }
    }, [isAuthenticated]);

    return { user, getUserDetails };
};

export default useUser;
