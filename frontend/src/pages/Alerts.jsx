import React from 'react';

const Alerts = () => {
  const alerts = [
    { id: 1, severity: 'HIGH', title: 'Suspicious Login', user: 'jdoe', time: '2 mins ago' },
    { id: 2, severity: 'MEDIUM', title: 'Mass File Deletion', user: 'asmith', time: '1 hour ago' },
    { id: 3, severity: 'LOW', title: 'Policy Violation', user: 'bwayne', time: '3 hours ago' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Alerts</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${alert.severity === 'HIGH' ? 'bg-red-100 text-red-800' : 
                      alert.severity === 'MEDIUM' ? 'bg-orange-100 text-orange-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alerts;
