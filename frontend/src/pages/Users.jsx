import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Shield, 
  Mail,
  Building,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock Data
  const users = [
    { id: 1, name: 'Sarah Connor', email: 'sarah.c@company.com', role: 'Engineer', dept: 'Engineering', status: 'Active', riskScore: 92, lastActive: '2 mins ago' },
    { id: 2, name: 'John Smith', email: 'john.s@company.com', role: 'Analyst', dept: 'Finance', status: 'Active', riskScore: 45, lastActive: '1 hour ago' },
    { id: 3, name: 'Mike Ross', email: 'mike.r@company.com', role: 'Legal Counsel', dept: 'Legal', status: 'Suspended', riskScore: 88, lastActive: '2 days ago' },
    { id: 4, name: 'Jessica Pearson', email: 'jessica.p@company.com', role: 'Director', dept: 'Management', status: 'Active', riskScore: 12, lastActive: '5 hours ago' },
    { id: 5, name: 'Louis Litt', email: 'louis.l@company.com', role: 'Manager', dept: 'Finance', status: 'Active', riskScore: 67, lastActive: '10 mins ago' },
    { id: 6, name: 'Rachel Zane', email: 'rachel.z@company.com', role: 'Paralegal', dept: 'Legal', status: 'Active', riskScore: 23, lastActive: '30 mins ago' },
    { id: 7, name: 'Donna Paulsen', email: 'donna.p@company.com', role: 'Admin', dept: 'Operations', status: 'Active', riskScore: 5, lastActive: '1 min ago' },
    { id: 8, name: 'Harvey Specter', email: 'harvey.s@company.com', role: 'Partner', dept: 'Legal', status: 'Warning', riskScore: 78, lastActive: '4 hours ago' },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-gray-500 mt-1">Monitor user activity and risk levels</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center transition-all hover:scale-105">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search users by name, email, or role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Department
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Risk Level
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role & Dept</th>
                <th className="px-6 py-4 font-medium">Risk Score</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Active</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{user.role}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <Building className="w-3 h-3 mr-1" />
                        {user.dept}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[140px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={`font-bold ${
                          user.riskScore > 80 ? 'text-red-600' : 
                          user.riskScore > 50 ? 'text-orange-500' : 
                          'text-green-600'
                        }`}>
                          {user.riskScore}/100
                        </span>
                        <span className="text-gray-400">
                          {user.riskScore > 80 ? 'Critical' : user.riskScore > 50 ? 'Moderate' : 'Low'}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            user.riskScore > 80 ? 'bg-red-500' : 
                            user.riskScore > 50 ? 'bg-orange-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${user.riskScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' :
                      user.status === 'Suspended' ? 'bg-red-50 text-red-700 border-red-100' :
                      'bg-yellow-50 text-yellow-700 border-yellow-100'
                    }`}>
                      {user.status === 'Active' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {user.status === 'Suspended' && <XCircle className="w-3 h-3 mr-1" />}
                      {user.status === 'Warning' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> results</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
