import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';
import { ShieldAlert, Lock, User, Zap, ArrowRight, BrainCircuit } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Biometric match failed. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl shadow-indigo-500/20 mb-6 rotate-12">
            <ShieldAlert className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Sentinel <span className="text-indigo-400">AI</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2">SECURE AUTHENTICATION GATEWAY</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-2xl relative mb-6 text-sm font-bold flex items-center">
              <ShieldAlert className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-2 ml-1">
                Operator ID
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-2 ml-1">
                Access Key
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/5 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full relative overflow-hidden bg-indigo-600 text-white py-5 px-6 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {loading ? 'Validating...' : 'Authorize Access'}
                {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[100%] transition-all duration-1000"></div>
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
             <div className="flex items-center justify-center space-x-2 text-slate-600 text-[10px] font-black tracking-widest uppercase">
                <BrainCircuit className="w-4 h-4" />
                <span>AI-DRIVEN BEHAVIORAL PROTECTION ACTIVE</span>
             </div>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-600 text-xs font-bold">
          RESTRICTED SYSTEM. UNAUTHORIZED ACCESS IS LOGGED.
        </p>
      </div>
    </div>
  );
};

export default Login;
