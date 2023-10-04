// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        isAdmin: false,
        // Add other relevant user information here if needed
    });

    const setAuthToken = (token) => {
        setAuthState({ ...authState, token });
    };

    return (
        <AuthContext.Provider value={{ authState, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
