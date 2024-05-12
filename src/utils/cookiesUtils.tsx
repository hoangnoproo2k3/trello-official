// utils/cookiesUtils.ts
import Cookies from 'js-cookie';

export const getCookieToken = (): string | undefined => {
    return Cookies.get('x-auth-cookie');
};

export const getGGIdCookie = (): string | undefined => {
    return Cookies.get('gg_id');
};
