import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F7F4D1] via-[#F7F4D1] to-[#418B7E]/10">
            <PublicNavbar />

            <div className="max-w-4xl mx-auto px-6 py-20 text-center animate-fade-in-up">
                <h1 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Smart Water Management <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#418B7E] via-[#4E977A] to-[#418B7E]">For The Future</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                    AquaSaver empowers you to monitor, control, and conserve water usage in real-time.
                    Using advanced AI prediction and IoT integration, we help you save money while saving the planet.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
                    <div className="p-6 bg-white/70 backdrop-blur rounded-2xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1">
                        <div className="w-12 h-12 bg-[#418B7E]/15 rounded-xl flex items-center justify-center text-[#418B7E] mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Real-time Analytics</h3>
                        <p className="text-slate-600">Track every drop with our precision dashboard and get instant insights.</p>
                    </div>
                    <div className="p-6 bg-white/70 backdrop-blur rounded-2xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1">
                        <div className="w-12 h-12 bg-[#7AB37C]/15 rounded-xl flex items-center justify-center text-[#7AB37C] mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Cost Savings</h3>
                        <p className="text-slate-600">Reduce your water bill by up to 30% with smart leakage detection.</p>
                    </div>
                    <div className="p-6 bg-white/70 backdrop-blur rounded-2xl border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 transform-gpu hover:-translate-y-1">
                        <div className="w-12 h-12 bg-[#4E977A]/15 rounded-xl flex items-center justify-center text-[#4E977A] mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">AI Suggestions</h3>
                        <p className="text-slate-600">Get personalized recommendations powered by Gemini AI.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
