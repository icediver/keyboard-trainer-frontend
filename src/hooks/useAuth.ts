// import { useContext } from 'react';
//
// import { AuthContext } from '../providers/auth-provider/AuthProvider';
//
// export const useAuth = () => useContext(AuthContext);
import { useTypedSelector } from "./useTypedSelector";

export const useAuth = () => useTypedSelector((state) => state.user);
