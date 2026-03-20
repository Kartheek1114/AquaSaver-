
import React, { useState } from 'react';
import { MOCK_DEVICES } from '../constants';
import { Plus, Cpu, RefreshCw, Signal, Settings2 } from 'lucide-react';

const Devices = () => {
  const [devices, setDevices] = useState(MOCK_DEVICES);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">IoT Ecosystem</h1>
          <p className="text-slate-500">Manage smart meters, tank sensors and leak detectors</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#418B7E] to-[#4E977A] text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60">
          <Plus className="w-5 h-5" />
          Link New Device
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white/80 backdrop-blur border border-white/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group transform-gpu hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${
                  device.type === 'flow-meter' ? 'bg-[#4E977A]/15 text-[#418B7E]' :
                  device.type === 'tank-monitor' ? 'bg-[#7AB37C]/15 text-[#7AB37C]' :
                  'bg-rose-50 text-rose-600'
                }`}>
                  <Cpu className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                    device.status === 'online' ? 'bg-[#7AB37C]/15 text-[#7AB37C]' : 'bg-[#F7F4D1]/70 text-[#09302B]/70'
                  }`}>
                    <Signal className={`w-3 h-3 ${device.status === 'online' ? 'animate-pulse' : ''}`} />
                    {device.status.toUpperCase()}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-1">ID: {device.id}</span>
                </div>
              </div>

              <h3 className="font-bold text-lg text-slate-800 mb-1">{device.name}</h3>
              <p className="text-sm text-slate-500 capitalize mb-6">{device.type.replace('-', ' ')}</p>

              <div className="bg-slate-50 rounded-xl p-4 mb-6 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-slate-500 font-medium">Real-time Data</span>
                  <span className="font-bold text-slate-800">
                    {device.currentReading} {device.type === 'tank-monitor' ? '%' : 'L/m'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${
                    device.type === 'leak-detector' ? 'bg-rose-500' : 'bg-[#418B7E]'
                  }`} style={{ width: `${Math.min(device.currentReading, 100)}%` }}></div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1 hover:text-slate-600 transition-colors">
                  <RefreshCw className="w-3 h-3 animate-spin-slow" />
                  Updating...
                </span>
                <button className="text-slate-400 hover:text-slate-800 transition-colors hover:scale-110 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60 rounded p-1">
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-semibold text-slate-500">Last seen: 2m ago</span>
                <button className="text-xs font-bold text-[#4E977A] hover:underline hover:translate-y-[-1px] transition-transform">
                View Logs
              </button>
            </div>
          </div>
        ))}

        <div className="border-2 border-dashed border-[#F7F4D1]/80 rounded-2xl flex flex-col items-center justify-center p-8 text-[#09302B]/70 hover:border-[#4E977A] hover:text-[#4E977A] transition-all cursor-pointer bg-white/60 hover:bg-white/80 shadow-sm hover:shadow-md transition-shadow">
           <Plus className="w-12 h-12 mb-3 opacity-50" />
           <p className="font-bold">Add Manual Meter Reading</p>
           <p className="text-sm opacity-60">For non-smart meters</p>
        </div>
      </div>
    </div>
  );
};

export default Devices;
