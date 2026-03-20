import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const googleButtonRef = useRef(null);

    useEffect(() => {
        if (!googleClientId || !googleButtonRef.current) return;

        const handleCredential = async (credentialResponse) => {
            const idToken = credentialResponse?.credential;
            if (!idToken) return;

            const result = await loginWithGoogle(idToken);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message);
            }
        };

        const initGoogle = () => {
            if (!window.google || !window.google.accounts || !window.google.accounts.id) return;
            try {
                googleButtonRef.current.innerHTML = '';
                window.google.accounts.id.initialize({
                    client_id: googleClientId,
                    callback: handleCredential,
                });
                window.google.accounts.id.renderButton(googleButtonRef.current, {
                    theme: 'outline',
                    size: 'large',
                    text: 'continue_with',
                    width: '100%',
                });
            } catch (e) {
                console.error('Google init error', e);
            }
        };

        if (window.google && window.google.accounts && window.google.accounts.id) {
            initGoogle();
            return;
        }

        const existing = document.getElementById('google-gis-script');
        if (existing) {
            existing.addEventListener('load', initGoogle);
            return;
        }

        const script = document.createElement('script');
        script.id = 'google-gis-script';
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initGoogle;
        document.body.appendChild(script);
    }, [googleClientId, loginWithGoogle, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F7F4D1] via-[#F7F4D1] to-[#418B7E]/10">
            <PublicNavbar />
            <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 88px)' }}>
                <div className="bg-white/80 backdrop-blur border border-white/60 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-md animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Welcome Back</h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#4E977A]/60 focus:border-transparent outline-none transition-all"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full px-4 py-2 pr-12 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#4E977A]/60 focus:border-transparent outline-none transition-all"
                                    placeholder="Your strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 right-3 flex items-center text-[#418B7E] hover:text-[#4E977A] transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#418B7E] to-[#4E977A] hover:shadow-xl hover:-translate-y-0.5 text-white font-bold py-3 rounded-xl shadow-lg transition-all transform active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#4E977A]/60"
                        >
                            Sign In
                        </button>

                        <div className="pt-2">
                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-[#062223]/10" />
                                <span className="text-[11px] font-bold text-[#09302B]/70 uppercase tracking-wider">Or continue with</span>
                                <div className="h-px flex-1 bg-[#062223]/10" />
                            </div>
                            <div
                                ref={googleButtonRef}
                                className="mt-4"
                                aria-label="Continue with Google"
                            />
                        </div>
                    </form>

                    <p className="mt-6 text-center text-slate-600 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#4E977A] font-bold hover:text-[#418B7E]">
                            Create Account
                        </Link>
                    </p>
                    <div className="mt-4 text-center">
                        <Link to="/about" className="text-slate-400 hover:text-slate-600 text-xs text-center">
                            About AquaSaver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
