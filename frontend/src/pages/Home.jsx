import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, BrainCircuit, Activity, Lock, Users, ArrowRight, ShieldAlert } from 'lucide-react';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-pink-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-md border-b border-white/5 bg-slate-900/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic">Sentinel <span className="text-indigo-400">AI</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#ai" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">AI Analysis</a>
              <a href="#contact" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Contact</a>
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl text-sm font-black hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 flex items-center group"
                >
                  Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-slate-400 hover:text-white px-4 py-2 text-sm font-bold transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white text-slate-900 px-6 py-2.5 rounded-2xl text-sm font-black hover:bg-slate-100 transition-all shadow-lg shadow-white/10 flex items-center group"
                  >
                    Get Started
                    <Zap className="w-4 h-4 ml-2 fill-current group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black tracking-widest uppercase mb-8 animate-bounce">
            <BrainCircuit className="w-4 h-4 mr-2" />
            Next-Gen Behavioral Intelligence
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            STOP THREATS <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">FROM WITHIN.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-xl md:text-2xl font-medium leading-relaxed mb-12">
            Sentinel AI uses advanced neural networks to identify suspicious behavior patterns before they become security breaches.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              className="w-full md:w-auto px-10 py-5 bg-indigo-600 text-white rounded-[2rem] text-xl font-black hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/40 flex items-center justify-center group"
            >
              Start Protection
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            <button className="w-full md:w-auto px-10 py-5 bg-slate-800 text-white rounded-[2rem] text-xl font-black hover:bg-slate-700 transition-all border border-white/5 flex items-center justify-center">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Floating UI Elements Simulation */}
        <div className="mt-24 relative max-w-5xl mx-auto">
          <div className="bg-gradient-to-b from-white/10 to-transparent p-px rounded-3xl shadow-2xl">
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-[calc(1.5rem-1px)] overflow-hidden border border-white/5 aspect-video flex items-center justify-center">
               <div className="text-center p-12">
                  <Activity className="w-20 h-20 text-indigo-500 mx-auto mb-6 animate-pulse" />
                  <p className="text-2xl font-black italic tracking-tighter text-slate-300">SCANNING NETWORK FOR ANOMALIES...</p>
                  <div className="mt-8 flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-1 h-8 bg-indigo-500/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 bg-slate-950/50 border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase italic">Total Security Ecosystem</h2>
            <p className="text-slate-500 text-xl font-medium">Engineered for modern high-security environments.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BrainCircuit}
              title="AI Behavioral Engine"
              desc="Real-time neural analysis of user interactions and access patterns."
              color="indigo"
            />
            <FeatureCard 
              icon={Shield}
              title="Insider Threat Detection"
              desc="Identify data exfiltration and sabotage attempts before they occur."
              color="purple"
            />
            <FeatureCard 
              icon={Zap}
              title="Instant Response"
              desc="Automated mitigation strategies that block suspicious vectors in ms."
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="relative z-10 py-32 bg-slate-900 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black tracking-tight mb-8 uppercase italic">Get Research Collaboration</h2>
          <p className="text-slate-400 text-lg mb-12">
            Interested in the deep learning methodologies or the CERT r4.2 dataset integration? 
            Connect with our research team for technical discussions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all">
              <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-2">Email Us</h4>
              <p className="text-xl font-bold text-white">research@sentinel-ai.io</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all">
              <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-2">Location</h4>
              <p className="text-xl font-bold text-white">Cybersecurity Lab, Tech City</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/5 text-center">
        <div className="flex items-center justify-center mb-6">
          <ShieldAlert className="w-6 h-6 text-indigo-500 mr-2" />
          <span className="font-black tracking-tighter uppercase italic">Sentinel AI</span>
        </div>
        <p className="text-slate-600 font-bold text-sm">© 2026 Sentinel AI. All Rights Reserved. Secure Your Future.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }) => {
  const colors = {
    indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-500/20',
    purple: 'from-purple-500 to-purple-600 shadow-purple-500/20',
    pink: 'from-pink-500 to-pink-600 shadow-pink-500/20'
  };

  return (
    <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-indigo-500/30 transition-all group hover:-translate-y-2">
      <div className={`w-14 h-14 bg-gradient-to-br ${colors[color]} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-black mb-3 text-white uppercase italic tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
};

export default Home;
