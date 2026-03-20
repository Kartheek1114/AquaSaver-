import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Devices from './components/Devices';
import Goals from './components/Goals';
import AdminPanel from './components/AdminPanel';
import { UserRole } from './types.js';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';

const ProtectedLayout = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  // For demo purposes, we can toggle role, but ideally it comes from user
  const [currentRole, setCurrentRole] = useState(user?.role || UserRole.CONSUMER);

  // Update role if user changes (e.g. re-login)
  React.useEffect(() => {
    if (user?.role) setCurrentRole(user.role);
  }, [user]);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  React.useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'devices': return <Devices />;
      case 'goals': return <Goals />;
      case 'admin': 
        if (user?.role === UserRole.ADMIN) return <AdminPanel />;
        return <Dashboard />;
      default: return <Dashboard />;
    }
  };

  if (!user) {
    // Show a loading state to avoid flash if checking auth
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4D1] via-[#F7F4D1] to-[#418B7E]/10 flex">
      {/* Sidebar - Persistent Navigation */}
      <Sidebar
        currentRole={currentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={logout}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        {/* Top Navbar */}
        <div className="max-w-7xl mx-auto flex justify-end items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#418B7E] via-[#4E977A] to-[#418B7E] flex items-center justify-center text-white shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60"
                aria-label="Open profile"
              >
                <span className="font-bold">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white/80 backdrop-blur border border-white/60 shadow-2xl rounded-2xl p-4 animate-fade-in-up">
                  <div className="text-sm font-bold text-[#062223] break-all">{user.name}</div>
                  <div className="text-xs text-[#09302B]/70 break-all mt-1">{user.email}</div>
                  <div className="mt-4 text-[11px] font-bold uppercase tracking-wider text-[#09302B]/50">
                    Role: {user.role}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Page Content */}
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Persistent Global Floating Alert (Demo Notification) */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white/80 backdrop-blur border-l-4 border-[#4E977A] shadow-2xl p-4 rounded-xl max-w-sm flex gap-4 animate-bounce-short hover:shadow-3xl transition-all duration-200">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-b from-[#4E977A]/15 to-[#418B7E]/10 rounded-lg flex items-center justify-center text-[#418B7E]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Smart Suggestion</h4>
            <p className="text-xs text-slate-500 leading-tight mt-1">
              Consumption is 15% higher than usual this hour. Check your kitchen faucet!
            </p>
          </div>
          <button className="text-slate-400 hover:text-slate-700 transition-colors hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60 rounded p-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-short {
          animation: bounce-short 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 500ms ease-out both;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .skeleton-shimmer {
          background-size: 200% 100%;
          background-image: linear-gradient(90deg, rgba(148,163,184,0.15) 0%, rgba(148,163,184,0.35) 50%, rgba(148,163,184,0.15) 100%);
          animation: shimmer 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<ProtectedLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
