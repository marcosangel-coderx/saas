import React, { useState } from 'react';
import { User, Building } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const departments = [
  'Engineering',
  'Finance',
  'Human Resources',
  'Marketing',
  'Sales',
  'Operations',
  'Legal',
  'Customer Support',
  'Research & Development',
  'Product Management',
  'Quality Assurance',
  'Business Development',
  'Administration',
  'Information Technology',
  'Design'
];

const roles = [
  { id: 'admin', name: 'Admin', description: 'Full access to all features' },
  { id: 'manager', name: 'Manager', description: 'Can manage team and assign modules' },
  { id: 'user', name: 'User', description: 'Can access assigned modules' },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access to assigned modules' }
];

interface TeamMemberFormData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  customPermissions: string[];
}

export const TeamMemberForm: React.FC = () => {
  const [formData, setFormData] = useState<TeamMemberFormData>({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    customPermissions: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle team member creation/update
    console.log('Team member data:', formData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <div className="mt-1 space-y-2">
            {roles.map((role) => (
              <label key={role.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="role"
                  value={role.id}
                  checked={formData.role === role.id}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">{role.name}</div>
                  <div className="text-sm text-gray-500">{role.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Custom Permissions</label>
          <div className="space-y-2">
            {[
              'View analytics',
              'Manage billing',
              'Access reports',
              'Invite team members',
              'Configure security settings'
            ].map((permission) => (
              <label key={permission} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.customPermissions.includes(permission)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        customPermissions: [...formData.customPermissions, permission]
                      });
                    } else {
                      setFormData({
                        ...formData,
                        customPermissions: formData.customPermissions.filter(p => p !== permission)
                      });
                    }
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">{permission}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">
            Save Team Member
          </Button>
        </div>
      </form>
    </Card>
  );
};