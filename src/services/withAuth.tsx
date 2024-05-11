'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthComponent = (props: P) => {
        const router = useRouter();

        useEffect(() => {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                router.push('/');
                return
            }
        }, []);
        // Cách chữa cháy tạm thời
        if (!localStorage.getItem('authToken')) return null;
        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;