import React, { useState } from 'react';
import { Package, Users, Search } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

interface Module {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
}

const mockModules: Module[] = [
  {
    id: '1',
    title: 'Financial Reporting Suite',
    description: 'Comprehensive financial reporting tools',
    category: 'Finance'
  },
  {
    id: '2',
    title: 'HR Management System',
    description: 'Complete HR management solution',
    category: 'HR'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Finance'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    department: 'HR'
  }
];

export const ModuleAssignmentForm: React.FC = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle module assignment
    console.log('Modules assigned:', { selectedModules, selectedUsers });
  };

  const filteredModules = mockModules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search modules or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Available Modules</h3>
            <div className="space-y-2">
              {filteredModules.map((module) => (
                <label
                  key={module.id}
                  className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedModules.includes(module.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedModules([...selectedModules, module.id]);
                      } else {
                        setSelectedModules(selectedModules.filter(id => id !== module.id));
                      }
                    }}
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{module.title}</div>
                    <div className="text-sm text-gray-500">{module.category}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Users</h3>
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                      }
                    }}
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.department}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={selectedModules.length === 0 || selectedUsers.length === 0}>
            Assign Modules
          </Button>
        </div>
      </Card>
    </form>
  );
};