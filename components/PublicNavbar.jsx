import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PublicNavbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'text-[#4E977A] font-bold' : 'text-[#09302B] hover:text-[#4E977A] font-medium';
    };

    return (
    <nav className="max-w-7xl mx-auto p-6 flex justify-between items-center bg-[#F7F4D1]/70 backdrop-blur border border-white/60 rounded-3xl shadow-sm">
      <Link to="/about" className="font-bold text-2xl text-[#062223] flex items-center gap-2 hover:opacity-95 transition-opacity">
        <div className="w-8 h-8 bg-gradient-to-tr from-[#418B7E] via-[#4E977A] to-[#418B7E] rounded-lg flex items-center justify-center text-white shadow-md">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                AquaSaver
            </Link>

            <div className="hidden md:flex items-center space-x-8">
        <Link to="/about" className={isActive('/about') + ' transition-colors'}>About</Link>
        <Link to="/login" className={isActive('/login') + ' transition-colors'}>Login</Link>
        <Link to="/register" className={isActive('/register') + ' transition-colors'}>Register</Link>
                {/* Admin link just goes to login for now, as requested by user to have it visible */}
        <Link
          to="/login"
          className="text-[#09302B] hover:text-[#062223] font-medium text-sm border border-white/60 px-3 py-1 rounded-full transition-colors hover:bg-[#F7F4D1]/60 focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60"
        >
                    Admin
                </Link>
            </div>

            {/* Mobile Menu Button (simplified) */}
            <div className="md:hidden">
        <Link to="/login" className="bg-gradient-to-r from-[#418B7E] to-[#4E977A] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60">
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default PublicNavbar;
