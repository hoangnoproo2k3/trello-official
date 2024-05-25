/* eslint-disable @next/next/no-img-element */
"use client"
import s from '@/styles/navbar.module.scss';
import { capitalizeFirstLetter } from '@/utils/format-text';
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { Heart, GlobeLock, LockKeyhole, MailPlus, Loader } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { getSearchUsers } from '@/apis/userApi';

const Navbar = ({ boardId, title_board, visibility, getMembersInBoard }: any) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const isLoadingRef = useRef(false);
    const visibilityCapitalized = useMemo(() => capitalizeFirstLetter(visibility), [visibility]);

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newSearchTerm = event.currentTarget.value;
            setSearchTerm(newSearchTerm);
            setShowDropdown(newSearchTerm.trim().length > 0);

            if (newSearchTerm.length === 0) {
                setSearchResults([]);
                isLoadingRef.current = false;
            } else {
                isLoadingRef.current = true;
            }
        },
        [setSearchTerm]
    );

    const handleError = useCallback((error: any) => {
        console.error('Error fetching search results:', error);
    }, []);

    const debouncedSearch = useCallback(
        debounce(async () => {
            isLoadingRef.current = true;
            try {
                const res = await getSearchUsers(searchTerm, { boardId });
                if (Array.isArray(res.getUsers)) {
                    setSearchResults(res.getUsers);
                }
            } catch (error) {
                handleError(error);
            } finally {
                isLoadingRef.current = false;
            }
        }, 700),
        [searchTerm, handleError]
    );

    useEffect(() => {
        if (isLoadingRef.current) {
            debouncedSearch();
        }
    }, [searchTerm, debouncedSearch, isLoadingRef]);
    const handleInputBlur = () => {
        setSearchTerm('');
        setShowDropdown(false)
    };

    return (
        <div className='pt-[30px] flex justify-between px-[28px] pb-[18px]'>
            <div className={s["container_navbar_left"] + ' hidden md:flex items-center'}>
                <p className={s['t-navbar'] + ' text-[#000] dark:text-white ' + ' mr-[48px] md:mr-[90px] '}>{title_board}</p>
                <Heart height={19} width={19} />
                <div className={s.rectangle}></div>
                <div className='flex items-center'>
                    <GlobeLock height={19} width={19} />
                    <p className={'text-[#000] dark:text-white pl-[8px] ' + s.public}>{visibilityCapitalized}</p>
                </div>
                <div className={s.rectangle}></div>
                <LockKeyhole height={19} width={19} />
            </div>
            <div className='flex items-center'>
                <div className='mr-[20px] md:mr-[40px]'>
                    <AvatarGroup isBordered max={3} total={getMembersInBoard?.count}>
                        {getMembersInBoard?.users.map((user: any) =>
                            <Avatar key={user._id} src={user.avatar} />
                        )}
                    </AvatarGroup>
                </div>
                <button className="relative mb-3 cursor-pointer ">
                    <input
                        type="text"
                        className="cursor-pointer peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                        id="invite"
                        placeholder="Invite"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />
                    <label
                        htmlFor="invite"
                        className="cursor-pointer flex gap-2 pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >
                        <MailPlus />
                        <span>Invite</span>
                    </label>
                    {showDropdown && (
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {isLoadingRef.current ? (
                                <div className="text-gray-500 block px-4 py-2 text-sm text-center">
                                    <Loader className="animate-spin text-gray-500" />
                                </div>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((result: any) => (
                                    <div
                                        key={result._id}
                                        onClick={() => setShowDropdown(false)}
                                        className={`${s['dropdown-item']} flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 `}
                                    // style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                    // title={result.email.length > 20 ? result.email : ''}
                                    >
                                        <img src={result.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                                        <span className={s.email}>{result.email}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 block px-4 py-2 text-sm text-center">
                                    Not found
                                </div>
                            )}
                        </div>
                    )}
                </button>
            </div>
        </div >
    )
}

export default Navbar