/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react'

const Search = ({ placeholder }: any) => {
    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
        setShowModal(event.target.value.trim() !== ''); // Hiển thị modal nếu có nội dung
    };
    return (
        <div className="relative w-[280px] lg:w-[328px] hidden md:block">
            <input value={inputValue}
                onChange={handleInputChange}
                type="search" id="default-search"
                className="block w-full px-4  py-3 ps-10 text-sm text-gray-900 rounded-[25px] bg-[#F4F4F4] outline-none ml-[20px] border-gray-300  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required />
            {!inputValue && (<div className="absolute inset-y-0 end-0  flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>)}
            {showModal && (
                <div className="absolute z-10 ml-6 mt-2 w-full bg-white rounded-md shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Item 1</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Item 2</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Item 3</a>
                </div>
            )}
        </div>
    )
}

export default Search
