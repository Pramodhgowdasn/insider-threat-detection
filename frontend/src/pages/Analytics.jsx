import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  ZAxis,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  Filter, 
  Download, 
  Calendar, 
  Search,
  AlertOctagon,
  TrendingUp
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock Data
  const scatterData = [
    { userId: 'u1', events: 450, risk: 95, department: 'Engineering' },
    { userId: 'u2', events: 320, risk: 88, department: 'Finance' },
    { userId: 'u3', events: 150, risk: 45, department: 'HR' },
    { userId: 'u4', events: 580, risk: 30, department: 'Sales' },
    { userId: 'u5', events: 200, risk: 92, department: 'Engineering' },
    { userId: 'u6', events: 120, risk: 15, department: 'Marketing' },
    { userId: 'u7', events: 890, risk: 60, department: 'IT' },
    { userId: 'u8', events: 40, risk: 10, department: 'Legal' },
  ];

  const timelineData = [
    { name: 'Mon', login: 40, file: 24, email: 24 },
    { name: 'Tue', login: 30, file: 13, email: 22 },
    { name: 'Wed', login: 20, file: 98, email: 22 },
    { name: 'Thu', login: 27, file: 39, email: 20 },
    { name: 'Fri', login: 18, file: 48, email: 21 },
    { name: 'Sat', login: 23, file: 38, email: 25 },
    { name: 'Sun', login: 34, file: 43, email: 21 },
  ];

  const departmentRiskData = [
    { name: 'Engineering', value: 45 },
    { name: 'Finance', value: 25 },
    { name: 'Sales', value: 15 },
    { name: 'HR', value: 10 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#9ca3af'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Behavioral Analytics</h1>
          <p className="text-gray-500 mt-1">Deep dive into user behavior patterns and anomaly detection</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm appearance-none cursor-pointer"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Top Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Highest Risk Dept</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Engineering</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <AlertOctagon className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+15% risk score vs last week</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Peak Activity Time</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">14:00 - 15:00</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Mostly file access events</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Anomalies</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">142</h3>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <Search className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1 transform rotate-180" />
            <span>-5% vs last week</span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk vs Volume Scatter Plot */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">User Risk Analysis</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis type="number" dataKey="events" name="Events" unit="" tick={{fill: '#9ca3af', fontSize: 12}} label={{ value: 'Activity Volume', position: 'bottom', offset: 0, fill: '#6b7280' }} />
                <YAxis type="number" dataKey="risk" name="Risk Score" unit="" tick={{fill: '#9ca3af', fontSize: 12}} label={{ value: 'Risk Score', angle: -90, position: 'left', fill: '#6b7280' }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Scatter name="Users" data={scatterData} fill="#3b82f6">
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.risk > 80 ? '#ef4444' : entry.risk > 50 ? '#f97316' : '#3b82f6'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Each point represents a user. <span className="text-red-500 font-medium">Red</span> indicates high risk.
          </p>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Activity Volume by Type</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" />
                <Bar dataKey="login" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="file" stackId="a" fill="#10b981" />
                <Bar dataKey="email" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Distribution Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Risk by Department</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentRiskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentRiskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High Risk User List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Top High Risk Entities</h3>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm">
                  <th className="px-6 py-3 font-medium">User / Entity</th>
                  <th className="px-6 py-3 font-medium">Department</th>
                  <th className="px-6 py-3 font-medium">Risk Score</th>
                  <th className="px-6 py-3 font-medium">Top Violation</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { user: 'Sarah Connor', dept: 'Engineering', score: 95, violation: 'Unusual Data Export', status: 'Active' },
                  { user: 'John Smith', dept: 'Finance', score: 88, violation: 'After-hours Login', status: 'Investigating' },
                  { user: 'Mike Ross', dept: 'Legal', score: 72, violation: 'Unauthorized Access', status: 'Resolved' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.user}</td>
                    <td className="px-6 py-4 text-gray-500">{row.dept}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={`font-bold ${row.score > 80 ? 'text-red-600' : 'text-orange-500'}`}>{row.score}</span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full ml-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${row.score > 80 ? 'bg-red-500' : 'bg-orange-500'}`} 
                            style={{ width: `${row.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{row.violation}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        row.status === 'Active' ? 'bg-red-100 text-red-700' : 
                        row.status === 'Investigating' ? 'bg-orange-100 text-orange-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
