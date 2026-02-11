import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/analytics.service';
import { 
  Activity, 
  ShieldAlert, 
  Users, 
  Server, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal, 
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Legend,
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

  // Mock data for charts - in a real app, this would come from an API
  const riskTrendData = [
    { name: '00:00', score: 20 },
    { name: '04:00', score: 15 },
    { name: '08:00', score: 45 },
    { name: '12:00', score: 80 },
    { name: '16:00', score: 50 },
    { name: '20:00', score: 30 },
    { name: '23:59', score: 25 },
  ];

  const eventTypeData = [
    { name: 'Login', value: 400 },
    { name: 'File Access', value: 300 },
    { name: 'Data Export', value: 100 },
    { name: 'System', value: 200 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await getEvents({ limit: 5 });
        
        // In a real scenario, we would calculate these or fetch from a stats API
        // For now, we'll use the mock stats state initialized above but update recent activity
        setRecentActivity(eventsData.data || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Security Overview</h1>
          <p className="text-gray-500 mt-1">Real-time monitoring and threat detection status</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all duration-200">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-200 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Live Monitoring
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Alerts" 
          value={stats.activeAlerts} 
          icon={ShieldAlert} 
          trend="+2.5%" 
          trendUp={true}
          color="red"
          gradient="from-red-500 to-rose-600"
        />
        <StatCard 
          title="High Risk Users" 
          value={stats.highRiskUsers} 
          icon={Users} 
          trend="+1.2%" 
          trendUp={true}
          color="orange"
          gradient="from-orange-500 to-amber-600"
        />
        <StatCard 
          title="Processed Events" 
          value={stats.processedEvents.toLocaleString()} 
          icon={Activity} 
          trend="+12%" 
          trendUp={true}
          color="blue"
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard 
          title="System Health" 
          value={stats.systemHealth} 
          icon={Server} 
          trend="Stable" 
          trendUp={true}
          color="green"
          gradient="from-emerald-500 to-teal-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Anomaly Detection Trends</h3>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-500">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Event Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {eventTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
             {eventTypeData.map((item, index) => (
               <div key={index} className="flex justify-between items-center text-sm">
                 <div className="flex items-center">
                   <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                   <span className="text-gray-600">{item.name}</span>
                 </div>
                 <span className="font-medium text-gray-900">{Math.round((item.value / 1000) * 100)}%</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity Log</h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Clock className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>No recent activity detected.</p>
            </div>
          ) : (
            recentActivity.map((event) => (
              <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    event.risk_score > 80 ? 'bg-red-100 text-red-600' : 
                    event.risk_score > 50 ? 'bg-orange-100 text-orange-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {event.risk_score > 80 ? <AlertTriangle className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.event_type}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-0.5">
                      <Users className="w-3 h-3 mr-1" />
                      <span className="mr-3">{event.user_id || event.source}</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{new Date(event.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right hidden md:block">
                    <p className={`text-sm font-bold ${
                      event.risk_score > 80 ? 'text-red-600' : 
                      event.risk_score > 50 ? 'text-orange-600' : 
                      'text-green-600'
                    }`}>
                      Risk Score: {event.risk_score || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-400">ID: {event.id.substring(0, 8)}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, trendUp, color, gradient }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-all duration-300">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-500`}></div>
    
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center space-x-1 text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
        <span>{trend}</span>
        {trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
      </div>
    </div>
    
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

export default Dashboard;
