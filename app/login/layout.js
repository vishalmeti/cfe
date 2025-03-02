'use client'

import { useEffect } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation'; 

const Layout = ({ children }) => {
    const router = useRouter();
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token') !== null;

        if (!isAuthenticated && router.pathname !== '/login') {
            router.replace('/login');
        }
        else if (isAuthenticated && router.pathname === '/login') {
            router.replace('/dashboard');
        }
    }, [router]);

    return (
        <div className="layout">
                {children}
        </div>
    );
};

export default Layout;