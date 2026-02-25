import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/analytics.service';
import { 
  Activity, 
  ShieldAlert, 
  Users, 
  Server, 
  Clock,
  AlertTriangle,
  TrendingUp,
  Zap,
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeAlerts: 12,
    highRiskUsers: 3,
    processedEvents: 15420,
    systemHealth: '98%'
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // AI Insights - Simulated
  const aiInsights = [
    { id: 1, type: 'Anomaly', message: 'Unusual data export pattern detected in Engineering dept', severity: 'high', confidence: '94%' },
    { id: 2, type: 'Behavior', message: 'User "jdoe" showing signs of credential harvesting', severity: 'medium', confidence: '82%' },
    { id: 3, type: 'Risk', message: 'System-wide risk score increased by 12% in last 2 hours', severity: 'low', confidence: '89%' },
  ];

  const riskTrendData = [
    { name: '00:00', score: 20 }, { name: '04:00', score: 15 }, { name: '08:00', score: 45 },
    { name: '12:00', score: 80 }, { name: '16:00', score: 50 }, { name: '20:00', score: 30 },
    { name: '23:59', score: 25 },
  ];

  const eventTypeData = [
    { name: 'Login', value: 400 }, { name: 'File Access', value: 300 },
    { name: 'Data Export', value: 100 }, { name: 'System', value: 200 },
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  const fetchData = async () => {
    try {
      const eventsData = await getEvents({ limit: 8 });
      if (eventsData && eventsData.data) {
        setRecentActivity(eventsData.data);
      }
      if (eventsData && eventsData.pagination) {
        setStats(prev => ({
          ...prev,
          processedEvents: eventsData.pagination.total || prev.processedEvents
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-bold animate-pulse text-xl">Initializing AI Engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Header with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center justify-center md:justify-start">
              <BrainCircuit className="w-10 h-10 mr-3 animate-pulse" />
              AI Threat Command Center
            </h1>
            <p className="text-indigo-100 text-lg opacity-90 max-w-xl">
              Advanced behavioral analytics engine monitoring organization-wide activities in real-time.
            </p>
          </div>
          <div className="flex bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-center px-4 border-r border-white/20">
              <p className="text-xs uppercase font-bold opacity-70 mb-1">Risk Level</p>
              <p className="text-2xl font-black text-yellow-300">MODERATE</p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs uppercase font-bold opacity-70 mb-1">Protection</p>
              <p className="text-2xl font-black text-green-300">ACTIVE</p>
            </div>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Stats Grid - Vibrant Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Alerts" value={stats.activeAlerts} icon={ShieldAlert} 
          gradient="from-red-500 to-rose-600" color="red" trend="+2"
        />
        <StatCard 
          title="High Risk Users" value={stats.highRiskUsers} icon={Users} 
          gradient="from-orange-500 to-amber-600" color="orange" trend="Stable"
        />
        <StatCard 
          title="Events Analyzed" value={stats.processedEvents.toLocaleString()} icon={Zap} 
          gradient="from-blue-500 to-indigo-600" color="blue" trend="+1.2k"
        />
        <StatCard 
          title="System Health" value={stats.systemHealth} icon={ShieldCheck} 
          gradient="from-emerald-500 to-teal-600" color="green" trend="Optimal"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart - Colorful Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Risk Propensity Timeline</h3>
              <p className="text-slate-500 text-sm">Aggregated AI risk scoring across all vectors</p>
            </div>
            <TrendingUp className="text-indigo-500 w-6 h-6" />
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4}
                  fillOpacity={1} fill="url(#colorRisk)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <BrainCircuit className="w-6 h-6 mr-2 text-indigo-400" />
              AI Behavior Insights
            </h3>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                      insight.severity === 'high' ? 'bg-red-500/20 text-red-400' : 
                      insight.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {insight.type}
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors">{insight.confidence} Conf.</span>
                  </div>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{insight.message}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-900/50">
              Run Deep Analysis
            </button>
          </div>
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Distribution Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Vector Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventTypeData} cx="50%" cy="50%" innerRadius={70} outerRadius={90}
                  paddingAngle={8} dataKey="value"
                >
                  {eventTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
             {eventTypeData.map((item, index) => (
               <div key={index} className="flex flex-col p-3 rounded-2xl bg-slate-50 border border-slate-100">
                 <div className="flex items-center mb-1">
                   <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                   <span className="text-xs text-slate-500 font-bold uppercase">{item.name}</span>
                 </div>
                 <span className="text-lg font-black text-slate-900">{item.value}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Activity Section - Colorful & Modern */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Activity Stream</h3>
              <p className="text-slate-500 text-sm">Real-time analysis results</p>
            </div>
            <button className="px-6 py-2 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-indigo-600 hover:bg-slate-50 shadow-sm transition-all">
              Live Feed
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentActivity.length === 0 ? (
              <div className="p-16 text-center text-slate-400">
                <Activity className="w-16 h-16 mx-auto opacity-20 mb-4" />
                <p className="text-lg font-medium">Monitoring data stream...</p>
              </div>
            ) : (
              recentActivity.map((event) => (
                <div key={event.id} className="p-6 flex items-center justify-between hover:bg-slate-50/80 transition-all group">
                  <div className="flex items-center space-x-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                      event.risk_score > 80 ? 'bg-rose-500 text-white shadow-rose-200' : 
                      event.risk_score > 50 ? 'bg-amber-500 text-white shadow-amber-200' : 
                      'bg-indigo-500 text-white shadow-indigo-200'
                    }`}>
                      {event.risk_score > 80 ? <AlertTriangle className="w-7 h-7" /> : <Activity className="w-7 h-7" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-black text-slate-900 text-lg uppercase tracking-tight">{event.event_type}</p>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          event.risk_score > 80 ? 'bg-rose-100 text-rose-600' : 
                          event.risk_score > 50 ? 'bg-amber-100 text-amber-600' : 
                          'bg-indigo-100 text-indigo-600'
                        }`}>
                          {event.risk_score > 80 ? 'CRITICAL' : event.risk_score > 50 ? 'SUSPICIOUS' : 'NORMAL'}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-slate-500 mt-1 space-x-4">
                        <div className="flex items-center">
                          <Users className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          <span className="font-medium">{event.user_id || event.source}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          <span>{event.created_at ? new Date(event.created_at).toLocaleTimeString() : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xs font-bold text-slate-400 uppercase">Risk Index</span>
                      <p className={`text-2xl font-black ${
                        event.risk_score > 80 ? 'text-rose-600' : 
                        event.risk_score > 50 ? 'text-amber-600' : 
                        'text-indigo-600'
                      }`}>
                        {event.risk_score || 0}
                      </p>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">VECTOR ID: {String(event.id).substring(0, 8)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, gradient, color, trend }) => {
  return (
    <div className="bg-white p-1 rounded-3xl shadow-xl shadow-slate-200/50 group transition-all hover:-translate-y-1">
      <div className="bg-white rounded-[22px] p-6 border border-slate-100">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform group-hover:scale-110`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase ${
            color === 'red' ? 'bg-red-50 text-red-600' : 
            color === 'orange' ? 'bg-orange-50 text-orange-600' : 
            color === 'blue' ? 'bg-blue-50 text-blue-600' : 
            'bg-green-50 text-green-600'
          }`}>
            {trend}
          </div>
        </div>
        <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest">{title}</h3>
        <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
