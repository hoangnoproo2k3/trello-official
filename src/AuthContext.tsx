// AuthProvider.tsx
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserCurrent } from './actions/api';

interface AuthContextType {
    user: any;
    login: () => void;
    logout: () => void;
}
// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const login = () => {
        window.location.href = `${process.env.API_ROOT}/auth/google`;
    };

    const logout = () => {
        window.location.href = `${process.env.API_ROOT}/auth/logout`;
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${process.env.API_ROOT}/auth/login/success`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });
                if (response.status === 200) {
                    const resObject = await response.json();
                    try {
                        const result = await getUserCurrent(resObject?.user?.id);
                        setUser(result.message);
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    throw new Error("Authentication has failed!");
                }

            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);

    const value: AuthContextType = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
