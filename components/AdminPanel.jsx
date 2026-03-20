
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { UserCheck, UserX, Shield, Mail } from 'lucide-react';

const AdminPanel = () => {
  const [users, setUsers] = useState(MOCK_USERS);

  const handleStatusChange = (id, newStatus) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Platform Management</h1>
        <p className="text-slate-500">Validate service providers, experts, and system health</p>
      </header>

      <div className="bg-white/80 backdrop-blur rounded-2xl border border-white/60 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Pending Approvals</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full ring-1 ring-amber-200/70">3 TASKS NEED ATTENTION</span>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User / Entity</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#418B7E]/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                    user.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                    user.role === 'PROVIDER' ? 'bg-[#418B7E]/15 text-[#418B7E]' :
                    'bg-[#7AB37C]/15 text-[#7AB37C]'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${
                    user.status === 'active' ? 'text-green-600' :
                    user.status === 'pending' ? 'text-amber-600' :
                    'text-slate-400'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      user.status === 'active' ? 'bg-green-500' :
                    user.status === 'pending' ? 'bg-amber-500' :
                      'bg-slate-400'
                    }`}></div>
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {user.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="p-2 text-green-700 hover:bg-green-50 rounded-lg transition-colors hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                          title="Approve"
                        >
                          <UserCheck className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(user.id, 'rejected')}
                          className="p-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                          title="Reject"
                        >
                          <UserX className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#418B7E]" />
            System Audit Log
          </h4>
          <div className="space-y-3 opacity-80 text-sm">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Expert Sarah Waters updated profile</span>
              <span className="text-slate-500 text-xs">2m ago</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Security Patch 1.2.4 deployed</span>
              <span className="text-slate-500 text-xs">1h ago</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>API Rate Limit Warning: Provider A</span>
              <span className="text-slate-500 text-xs">4h ago</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-white/60 hover:shadow-xl transition-all duration-300">
           <h4 className="font-bold text-lg mb-4">Storage Usage</h4>
           <div className="space-y-4">
             <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Database (PostgreSQL)</span>
                  <span className="font-bold">42.5 GB / 100 GB</span>
                </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#418B7E] h-full w-[42.5%]"></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">IoT Log Storage</span>
                  <span className="font-bold">128.0 GB / 500 GB</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4E977A] h-full w-[25.6%]"></div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
