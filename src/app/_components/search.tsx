/* eslint-disable react/display-name */
/* eslint-disable react/no-unescaped-entities */
'use client';
import { getSearchTitleBoards } from '@/apis/boardApi';
import { containsSubstring } from '@/utils/format-text';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const Search = React.memo(({ placeholder, userId }: any) => {
    const currentPath = usePathname();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const isLoadingRef = useRef(false);

    const checkUrl = useMemo(() => containsSubstring(currentPath, '/vi'), [currentPath]);

    const handleInputChange = useCallback(
        (event: any) => {
            const newSearchTerm = event.target.value;
            setSearchTerm(newSearchTerm);

            if (newSearchTerm.length === 0) {
                setSearchResults([]);
                isLoadingRef.current = false;
                setShowModal(false)
            } else {
                setShowModal(true);
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
                const res = await getSearchTitleBoards(searchTerm, { ownerId: userId });
                if (Array.isArray(res.getBoards)) {
                    setSearchResults(res.getBoards);
                }
            } catch (error) {
                handleError(error);
            } finally {
                isLoadingRef.current = false;
            }
        }, 700),
        [searchTerm, userId, handleError]
    );

    useEffect(() => {
        if (isLoadingRef.current) {
            debouncedSearch();
        }
    }, [searchTerm, userId, debouncedSearch, isLoadingRef]);

    return (
        <div className="relative w-[280px] lg:w-[328px] hidden md:block">
            <input
                value={searchTerm}
                onChange={handleInputChange}
                type="search"
                id="default-search"
                className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 rounded-[25px] bg-[#F4F4F4] outline-none ml-[20px] border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required
            />
            {!searchTerm && (
                <div className="absolute inset-y-0 end-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
            )}
            {showModal && (
                <div className="absolute z-10 ml-6 mt-2 w-full bg-white rounded-md shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                    {isLoadingRef.current && (
                        <div className="flex items-center justify-center py-4">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                            >
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    )}
                    {!isLoadingRef.current && searchResults.length === 0 && (
                        <div className="flex items-center justify-center py-4">
                            <p className="text-gray-500 dark:text-gray-400">No results found.</p>
                        </div>
                    )}
                    {!isLoadingRef.current && searchResults.length > 0 && (
                        <ul>
                            {searchResults.map((result: any) => (
                                <Link
                                    key={result._id}
                                    onClick={() => setShowModal(false)}
                                    href={`${checkUrl ? '/vi' : '/en'}/boards/${result?.slug}?boardIdObj=${result?._id}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    {result.title}
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
});

export default Search;