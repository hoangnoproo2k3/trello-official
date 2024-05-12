/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import LocalSwitcher from '@/app/_components/local-switcher';
import { ModeToggle } from '@/app/_components/mode-toggle';
import Search from '@/app/_components/search';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from '@/context/AuthContext';
import { getCookieToken, getGGIdCookie } from '@/utils/cookiesUtils';
import { isTokenExpired } from '@/utils/tokenUtils';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

const Header = () => {
    const t = useTranslations('Header');
    const [user, setUser] = useState<any>(null);
    const authContext = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            const ggId = getGGIdCookie();
            const token = getCookieToken();
            if (token && !isTokenExpired(token)) {
                try {
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    };
                    const response = await axios.get(`${process.env.API_ROOT}/v1/users/${ggId}`, { headers });
                    const userData = response.data;
                    console.log(userData);

                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchData();
    }, []);
    if (!authContext) {
        return <div>Loading...</div>;
    }

    const { isLoggedIn, handleLogin, logout } = authContext;
    return (
        <div className='flex justify-between px-[30px] py-[13px] border-b-2 border-gray-200 dark:border-gray-700'>
            <div className='flex relative'>
                <Link href={'/'} className='pr-[20px] flex items-center font-dancing font-semibold text-2xl dark:text-gray-200'>
                    Trello
                </Link>
                <div className='hidden lg:flex items-center px-[20px] border-l-2 border-r-2 border-gray-300 dark:border-gray-700'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="24" y="24" width="24" height="24" rx="3" transform="rotate(-180 24 24)" fill="#F4F4F4" />
                        <rect opacity="0.2" x="10.44" y="20.88" width="7.32" height="10.5" rx="1.44" transform="rotate(-180 10.44 20.88)" fill="black" />
                        <rect opacity="0.2" x="20.88" y="20.88" width="7.32" height="16.5" rx="1.44" transform="rotate(-180 20.88 20.88)" fill="black" />
                    </svg>
                    <p className='text-[#000] pl-[5px] dark:text-white'>{t('board')}</p>
                </div>
                <Search placeholder={t('placeholder')} />
            </div>
            <div className='flex items-center'>
                <LocalSwitcher />
                <div className='mx-[20px] hidden md:block' >
                    <ModeToggle />
                </div>
                {!isLoggedIn ? <div className='flex items-center w-40 mr-[20px]'>
                    <button onClick={handleLogin} className="w-32 px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                        <span>Login</span>
                    </button>
                </div> :
                    <div className='flex items-center w-20 mr-[32px]'>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <img className="rounded-full" src={user?.message?.avatar} alt="Rounded avatar" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user?.message?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>}
            </div>
        </div>
    )
}

export default Header
