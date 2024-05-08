/* eslint-disable @next/next/no-img-element */
"use client"
import s from '@/styles/navbar.module.scss';
import { capitalizeFirstLetter } from '@/utils/format-text';
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { GlobeLock, Heart, LockKeyhole, MailPlus } from 'lucide-react';
import { useState } from 'react';
const Navbar = ({ title_board, visibility }: any) => {
    const [inputValue, setInputValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (e: any) => {
        setInputValue(e.target.value);
        setShowDropdown(e.target.value.trim() !== ""); // Hiển thị dropdown nếu có nội dung
    };

    return (
        <div className='pt-[30px] flex justify-between px-[28px] pb-[18px]'>
            <div className={s["container_navbar_left"] + ' hidden md:flex items-center'}>
                <p className={s['t-navbar'] + ' text-[#000] dark:text-white ' + ' mr-[48px] md:mr-[90px] '}>{title_board}</p>
                <Heart height={19} width={19} />
                <div className={s.rectangle}></div>
                <div className='flex items-center'>
                    <GlobeLock height={19} width={19} />
                    <p className={'text-[#000] dark:text-white pl-[8px] ' + s.public}>{capitalizeFirstLetter(visibility)}</p>
                </div>
                <div className={s.rectangle}></div>
                <LockKeyhole height={19} width={19} />
            </div>
            <div className='flex items-center'>
                <div className='mr-[20px] md:mr-[40px]'>
                    <AvatarGroup isBordered max={3} total={10}>
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                    </AvatarGroup>
                </div>

                {/* <div className="flex -space-x-2 ">
                    <img className="inline-block size-[40px] rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                    <img className="inline-block size-[40px] rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                    <img className="inline-block size-[40px] rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Image Description" />
                    <img className="inline-block size-[40px] rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                    <div className="hs-dropdown relative inline-flex [--placement:top-left]">
                        <button id="hs-avatar-group-dropdown" className="hs-dropdown-toggle inline-flex items-center justify-center size-[46px] rounded-full bg-white border-2 border-gray-100 font-medium text-gray-700 shadow-sm align-middle hover:bg-gray-300 focus:outline-none focus:bg-blue-100 focus:text-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm">
                            <span className="font-medium leading-none">9+</span>
                        </button>

                        <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-48 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mb-2 bg-white shadow-md rounded-lg p-2" aria-labelledby="hs-avatar-group-dropdown">
                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#">
                                Chris Lynch
                            </a>
                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#">
                                Maria Guan
                            </a>
                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#">
                                Amil Evara
                            </a>
                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100" href="#">
                                Ebele Egbuna
                            </a>
                        </div>
                    </div>
                </div> */}
                {/* <button className="w-32 px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                    <MailPlus />
                    <span>Invite</span>
                </button> */}

                <button className="relative mb-3 cursor-pointer " data-twe-input-wrapper-init>
                    <input
                        type="text"
                        className="cursor-pointer peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                        id="invite"
                        placeholder="Invite"
                        value={inputValue}
                        onChange={handleChange}
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
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm text-left">
                                Account settings
                            </a>
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm text-left">
                                Support
                            </a>
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm text-left">
                                License
                            </a>
                        </div>
                    )}
                </button>

            </div>
        </div >
    )
}

export default Navbar
