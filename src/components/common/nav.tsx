import React from 'react'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import Link from 'next/link';
const Nav = () => {
    const currentPath = usePathname()
    const [activePath, setActivePath] = useState("");
    useEffect(() => {
        setActivePath(getActivePath(currentPath));
    }, [currentPath]);

    const getActivePath = (path: string) => {
        if (path === "/") return "";
        if (path.includes("/boards")) return "boards";
        return "";
    };
    return (
        <nav className="w-80 h-screen flex flex-col gap-10 border-r-2 border-gray-200 dark:border-gray-700">
            <ul className="px-6 space-y-2 pt-12">
                <li>
                    <Link
                        className={` block px-4 py-2.5 text-slate-800 dark:text-white font-semibold hover:bg-emerald-950 hover:text-white rounded-lg ${activePath === "" ? "bg-slate-400 text-white" : ""
                            }`}
                        href="/"
                    >
                        Trang chủ
                    </Link>
                </li>
                <li>
                    <Link
                        className={`block px-4 py-2.5 text-slate-800 dark:text-white font-semibold hover:bg-emerald-950 hover:text-white rounded-lg ${activePath === "boards" ? "bg-slate-400 text-white " : ""
                            }`}
                        href={`${activePath === "boards" ? '' : currentPath + '/boards'}`}
                    >
                        Bảng
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
