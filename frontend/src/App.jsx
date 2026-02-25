import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Cases from './pages/Cases';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Login from './pages/Login';

import { 
  LayoutDashboard, 
  ShieldAlert, 
  Briefcase, 
  Users as UsersIcon, 
  BarChart3, 
  LogOut,
  ChevronRight
} from 'lucide-react';

// Layout component with Modern Sidebar
const Layout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
    <aside className="w-72 bg-slate-900 text-white p-6 flex flex-col shadow-2xl relative overflow-hidden">
      {/* Decorative Background for Sidebar */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center mb-12 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">Sentinel <span className="text-indigo-400">AI</span></h1>
        </div>

        <nav className="space-y-2 flex-1">
          <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavLink to="/alerts" icon={ShieldAlert} label="Alerts" />
          <NavLink to="/cases" icon={Briefcase} label="Cases" />
          <NavLink to="/users" icon={UsersIcon} label="Users" />
          <NavLink to="/analytics" icon={BarChart3} label="Analytics" />
        </nav>

        <div className="pt-6 border-t border-white/10 mt-auto">
          <button 
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="flex items-center w-full py-3 px-4 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-2xl transition-all font-bold group"
          >
            <LogOut className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
    <main className="flex-1 p-10 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  </div>
);

const NavLink = ({ to, icon: Icon, label }) => {
  const isActive = window.location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center justify-between py-3.5 px-5 rounded-2xl transition-all duration-300 group ${
        isActive 
        ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-xl shadow-indigo-900/50' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className="flex items-center">
        <Icon className={`w-5 h-5 mr-3.5 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
        <span className="font-bold tracking-wide">{label}</span>
      </div>
      {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
    </Link>
  );
};

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('PrivateRoute token:', token);
  return token ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/alerts" element={
          <PrivateRoute>
            <Alerts />
          </PrivateRoute>
        } />

        <Route path="/cases" element={
          <PrivateRoute>
            <Cases />
          </PrivateRoute>
        } />

        <Route path="/users" element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        } />

        <Route path="/analytics" element={
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        } />

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
