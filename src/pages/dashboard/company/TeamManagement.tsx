import React, { useState } from 'react';
import { Users, UserPlus, Search, Filter, Edit, Trash2, Shield, Mail } from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../context/AuthContext';
import { teamMembers, moduleAssignments } from '../../../data/mockData';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  modulesAssigned: number;
}

const TeamManagement: React.FC = () => {
  const { auth } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  
  // Get team members data
  const members: TeamMember[] = teamMembers.map(member => {
    const assignedModules = moduleAssignments.filter(ma => ma.userId === member.id);
    return {
      ...member,
      status: 'active' as const,
      lastActive: member.lastLogin?.toLocaleDateString() || 'Never',
      modulesAssigned: assignedModules.length,
      department: member.department || 'N/A'
    };
  });
  
  // Filter team members
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });
  
  // Get unique roles and departments for filters
  const roles = ['all', ...new Set(members.map(member => member.role))];
  const departments = ['all', ...new Set(members.map(member => member.department))];

  const formatText = (text: string | undefined): string => {
    if (!text) return 'N/A';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
        <Button className="flex items-center">
          <UserPlus size={16} className="mr-2" /> Add Team Member
        </Button>
      </div>
      
      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : formatText(role)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm rounded-md"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department === 'all' ? 'All Departments' : formatText(department)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Team Members Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role / Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modules
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-semibold flex-shrink-0">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatText(member.role)}</div>
                    <div className="text-sm text-gray-500">{formatText(member.department)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.status === 'active' ? 'bg-green-100 text-green-800' : member.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.modulesAssigned}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-900 hover:text-blue-700">
                        <Mail size={18} />
                      </button>
                      <button className="text-teal-700 hover:text-teal-500">
                        <Shield size={18} />
                      </button>
                      <button className="text-purple-700 hover:text-purple-500">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-400">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No team members found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            <div className="mt-6">
              <Button onClick={() => { setSearchTerm(''); setFilterRole('all'); setFilterDepartment('all'); }}>
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </Card>
      
      {/* Role Management */}
      <Card title="Role Management" subtitle="Define access levels and permissions for your team">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Admin</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Full Access
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Can manage all aspects of the company account, including team members, modules, and billing.
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li className="flex items-center">
                <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                </span>
                Manage team members
              </li>
              <li className="flex items-center">
                <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                </span>
                Assign modules
              </li>
              <li className="flex items-center">
                <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                </span>
                Manage billing
              </li>
              <li className="flex items-center">
                <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                </span>
                View all reports
              </li>
            </ul>
            <Button variant="outline" size="sm" className="w-full">
              Edit Role
            </Button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Developer</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                Standard Access
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Can access and use assigned modules, view team activity, and generate reports.
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li className="flex items-center">
                <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                </span>
                Use assigned modules
              </li>
              <li className="flex items-center">
                <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                </span>
                View team activity
              </li>
              <li className="flex items-center">
                <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                </span>
                Generate reports
              </li>
              <li className="flex items-center">
                <span className="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-red-600 rounded-full"></span>
                </span>
                Manage billing
              </li>
            </ul>
            <Button variant="outline" size="sm" className="w-full">
              Edit Role
            </Button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Viewer</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Limited Access
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Can view assigned modules and basic reports, but cannot modify settings.
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li className="flex items-center">
                <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                </span>
                View assigned modules
              </li>
              <li className="flex items-center">
                <span className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                </span>
                View basic reports
              </li>
              <li className="flex items-center">
                <span className="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-red-600 rounded-full"></span>
                </span>
                Assign modules
              </li>
              <li className="flex items-center">
                <span className="h-4 w-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  <span className="h-2 w-2 bg-red-600 rounded-full"></span>
                </span>
                Manage team
              </li>
            </ul>
            <Button variant="outline" size="sm" className="w-full">
              Edit Role
            </Button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
          <Button>
            Create Custom Role
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TeamManagement;