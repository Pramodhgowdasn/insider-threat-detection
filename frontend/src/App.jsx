import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Cases from './pages/Cases';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Login from './pages/Login';

// Layout component with Sidebar
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-100 flex">
    <aside className="w-64 bg-slate-900 text-white p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-8 px-4">Insider Threat Det.</h1>
      <nav className="space-y-2 flex-1">
        <Link to="/dashboard" className="block py-2 px-4 hover:bg-slate-800 rounded transition-colors">
          Dashboard
        </Link>
        <Link to="/alerts" className="block py-2 px-4 hover:bg-slate-800 rounded transition-colors">
          Alerts
        </Link>
        <Link to="/cases" className="block py-2 px-4 hover:bg-slate-800 rounded transition-colors">
          Cases
        </Link>
        <Link to="/users" className="block py-2 px-4 hover:bg-slate-800 rounded transition-colors">
          Users
        </Link>
        <Link to="/analytics" className="block py-2 px-4 hover:bg-slate-800 rounded transition-colors">
          Analytics
        </Link>
      </nav>
      <div className="pt-4 border-t border-slate-700">
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="block w-full text-left py-2 px-4 hover:bg-slate-800 rounded text-red-400"
        >
          Logout
        </button>
      </div>
    </aside>
    <main className="flex-1 p-8 overflow-auto">
      {children}
    </main>
  </div>
);

// Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
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
