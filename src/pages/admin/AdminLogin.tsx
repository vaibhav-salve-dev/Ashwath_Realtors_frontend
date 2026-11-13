import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Lock, User, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import logo from '../../assets/logo2.png';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (login(username, password)) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password. Please verify credentials.');
      }
      setLoading(false);
    }, 400);
  };

  const fillTestCredentials = () => {
    setUsername('admin');
    setPassword('Ashwath@2024');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background glowing ambient light orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Return to site back link */}
      <div className="w-full max-w-md mb-4 sm:mb-6 z-20 flex justify-start">
        <Link
          to="/"
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Public Website</span>
        </Link>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="glass-panel-dark rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl backdrop-blur-2xl">
          {/* Logo Brand Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 p-2 mx-auto mb-3 sm:mb-4 shadow-glow-gold flex items-center justify-center">
              <img src={logo} alt="Ashwath Realtors" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
              Ashwath Realtors
            </h1>
            <p className="text-[11px] sm:text-xs text-amber-400 font-semibold tracking-widest uppercase mt-1">
              Secure Staff Console
            </p>
          </div>

          {error && (
            <div className="p-3 mb-5 sm:mb-6 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Staff Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Staff Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Console'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Demo Credentials pill */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={fillTestCredentials}
              className="text-xs text-amber-400/90 hover:text-amber-300 transition-colors underline font-medium"
            >
              Click here to auto-fill default credentials
            </button>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-500/70" />
              <span>Role-based access control enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
