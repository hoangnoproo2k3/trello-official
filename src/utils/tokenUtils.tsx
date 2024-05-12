// utils/tokenUtils.ts
import jwt, { JwtPayload } from 'jsonwebtoken';

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwt.decode(token) as JwtPayload;
        const currentTime = Math.floor(Date.now() / 1000);
        return !!(decoded?.exp && decoded.exp < currentTime);
    } catch (err) {
        console.error('Error decoding token:', err);
        return true;
    }
};
