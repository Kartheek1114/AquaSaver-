
import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { UserRole } from '../types.js';

const Sidebar = ({ currentRole, activeTab, setActiveTab, onLogout }) => {
  const filteredItems = NAVIGATION_ITEMS.filter(item => item.roles.includes(currentRole));

  return (
    <div className="w-64 h-screen bg-[#F7F4D1]/70 backdrop-blur border-r border-white/60 fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-[#418B7E] via-[#4E977A] to-[#418B7E] rounded-xl flex items-center justify-center text-white shadow-md">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-[#062223]">AquaSaver</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 transform-gpu ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-[#4E977A]/15 via-[#418B7E]/15 to-[#4E977A]/15 text-[#062223] shadow-sm ring-1 ring-[#4E977A]/30'
                : 'text-[#09302B] hover:bg-[#F7F4D1]/70 hover:text-[#062223] hover:-translate-y-0.5 hover:shadow-sm'
          } focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="bg-slate-50 p-3 rounded-xl hover:shadow-sm transition-shadow">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Role Active</p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${currentRole === 'admin' ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="text-sm font-medium text-slate-700">{currentRole}</span>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-red-700 hover:bg-red-50 transition-colors text-sm font-medium hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
