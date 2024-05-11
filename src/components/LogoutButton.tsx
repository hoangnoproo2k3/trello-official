'use client'; // This is a Client Component

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem('authToken');

        // Chuyển hướng đến trang đăng nhập hoặc trang khác
        router.push('/');
    };

    return <button onClick={handleLogout}>Đăng xuất</button>;
};

export default LogoutButton;