"use client"
// context/AuthContext.tsx
import { getCookieToken } from '@/utils/cookiesUtils';
import { createContext, ReactNode } from 'react';

interface AuthContextValue {
    isLoggedIn: boolean;
    handleLogin: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const isLoggedIn = getCookieToken() !== undefined;

    const handleLogin = () => {
        window.location.href = `${process.env.API_ROOT}/auth/google`;
    };

    const logout = () => {
        window.location.href = `${process.env.API_ROOT}/auth/logout`;
    };

    const value: AuthContextValue = {
        isLoggedIn,
        handleLogin,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
