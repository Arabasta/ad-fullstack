import { useContext } from 'react';
import {AuthContext} from "../config/context/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
