import React, { useState } from 'react';
import { 
  LayoutGrid, 
  LayoutList, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  AlertOctagon,
  ArrowRight
} from 'lucide-react';

const Cases = () => {
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'
  
  // Mock Data
  const cases = [
    { id: 'CS-2024-001', title: 'Suspicious Data Export', assignee: 'Jane Doe', priority: 'High', status: 'New', date: '2 hrs ago', description: 'User attempted to export 5GB of sensitive data.' },
    { id: 'CS-2024-002', title: 'After-hours Login', assignee: 'Mike Ross', priority: 'Medium', status: 'In Progress', date: '5 hrs ago', description: 'Multiple login attempts from unauthorized IP.' },
    { id: 'CS-2024-003', title: 'Privilege Escalation', assignee: 'Sarah Smith', priority: 'Critical', status: 'Review', date: '1 day ago', description: 'Detected attempt to modify sudoers file.' },
    { id: 'CS-2024-004', title: 'USB Device Detected', assignee: 'Unassigned', priority: 'Low', status: 'New', date: '1 day ago', description: 'Unauthorized USB storage device connected.' },
    { id: 'CS-2024-005', title: 'Malware Signature', assignee: 'John Wick', priority: 'High', status: 'Closed', date: '2 days ago', description: 'Known malware signature detected in temp folder.' },
    { id: 'CS-2024-006', title: 'Policy Violation', assignee: 'Jane Doe', priority: 'Medium', status: 'In Progress', date: '3 days ago', description: 'User accessed blocked category website.' },
    { id: 'CS-2024-007', title: 'Brute Force Attack', assignee: 'System', priority: 'High', status: 'Review', date: '3 days ago', description: '150 failed login attempts in 1 minute.' },
  ];

  const columns = [
    { id: 'New', label: 'New Cases', color: 'blue' },
    { id: 'In Progress', label: 'In Investigation', color: 'orange' },
    { id: 'Review', label: 'Under Review', color: 'purple' },
    { id: 'Closed', label: 'Resolved', color: 'green' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Case Management</h1>
          <p className="text-gray-500 mt-1">Track and investigate security incidents</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
            <button 
              onClick={() => setViewMode('board')}
              className={`p-2 rounded-md transition-all ${viewMode === 'board' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center transition-all hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            New Case
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search cases by ID, title, or assignee..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </div>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Board View */}
      {viewMode === 'board' && (
        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-6 min-w-max pb-4">
            {columns.map(col => (
              <div key={col.id} className="w-80 flex-shrink-0">
                <div className={`flex items-center justify-between mb-4 px-1`}>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-${col.color}-500 mr-2`}></div>
                    <h3 className="font-semibold text-gray-700">{col.label}</h3>
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                      {cases.filter(c => c.status === col.id).length}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {cases.filter(c => c.status === col.id).map(caseItem => (
                    <div key={caseItem.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getPriorityColor(caseItem.priority)}`}>
                          {caseItem.priority}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{caseItem.id}</span>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{caseItem.title}</h4>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{caseItem.description}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                            {caseItem.assignee.charAt(0)}
                          </div>
                          <span className="text-xs text-gray-500 ml-2">{caseItem.assignee.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {caseItem.date}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="px-6 py-4 font-medium">Case Details</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Assignee</th>
                <th className="px-6 py-4 font-medium">Created</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cases.map(caseItem => (
                <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{caseItem.title}</p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{caseItem.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      caseItem.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      caseItem.status === 'In Progress' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                      caseItem.status === 'Review' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                      'bg-green-50 text-green-700 border-green-100'
                    }`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center text-sm ${
                      caseItem.priority === 'Critical' ? 'text-red-600 font-medium' :
                      caseItem.priority === 'High' ? 'text-orange-600' :
                      'text-gray-600'
                    }`}>
                      {caseItem.priority === 'Critical' && <AlertOctagon className="w-4 h-4 mr-1.5" />}
                      {caseItem.priority === 'High' && <AlertTriangle className="w-4 h-4 mr-1.5" />}
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                        {caseItem.assignee.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600">{caseItem.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {caseItem.date}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                      View
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cases;
