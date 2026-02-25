import React, { useState, useEffect } from 'react';
import { getUsers, createUser } from '../services/user.service';
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
  XCircle,
  X,
  User,
  Lock
} from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'Engineer',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      // Map backend users to UI format
      const formattedUsers = data.map(u => ({
        id: u.id,
        name: u.username,
        email: u.email || `${u.username}@company.com`,
        role: u.role || 'User',
        dept: 'Engineering', // Mock dept
        status: 'Active',
        riskScore: Math.floor(Math.random() * 100), // Mock risk score for now
        lastActive: 'Just now'
      }));
      setUsers(formattedUsers);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedRisk, setSelectedRisk] = useState('All Risk Levels');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All Departments' || user.dept === selectedDept;
    const matchesRisk = selectedRisk === 'All Risk Levels' || 
      (selectedRisk === 'High' && user.riskScore > 80) ||
      (selectedRisk === 'Medium' && user.riskScore > 40 && user.riskScore <= 80) ||
      (selectedRisk === 'Low' && user.riskScore <= 40);
    return matchesSearch && matchesDept && matchesRisk;
  });

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      setShowAddModal(false);
      setNewUser({ username: '', email: '', role: 'Engineer', password: '' });
      fetchUsers();
    } catch (err) {
      alert("Failed to create user: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-gray-500 mt-1">Monitor user activity and risk levels</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center transition-all hover:scale-105"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Register New User</h2>
                <p className="text-blue-100 text-sm">Add a new team member to monitor</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-blue-500 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    required
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    placeholder="jdoe"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="email" 
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="john@company.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Role</label>
                  <select 
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option>Engineer</option>
                    <option>Analyst</option>
                    <option>Manager</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                    <option>Engineering</option>
                    <option>Finance</option>
                    <option>Legal</option>
                    <option>Operations</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Initial Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="password" 
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm outline-none cursor-pointer"
          >
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Finance</option>
            <option>Legal</option>
            <option>Operations</option>
          </select>
          <select 
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm outline-none cursor-pointer"
          >
            <option>All Risk Levels</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
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
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No users found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
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
