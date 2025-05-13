import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

interface FilterCriteria {
  field: string;
  operator: string;
  value: string;
}

export const AdvancedFiltersForm: React.FC = () => {
  const [filters, setFilters] = useState<FilterCriteria[]>([
    { field: '', operator: 'equals', value: '' }
  ]);

  const fields = [
    { id: 'name', label: 'Name' },
    { id: 'department', label: 'Department' },
    { id: 'role', label: 'Role' },
    { id: 'status', label: 'Status' },
    { id: 'lastActive', label: 'Last Active' },
    { id: 'modulesAssigned', label: 'Modules Assigned' },
    { id: 'createdAt', label: 'Created Date' },
    { id: 'updatedAt', label: 'Updated Date' }
  ];

  const operators = [
    { id: 'equals', label: 'Equals' },
    { id: 'contains', label: 'Contains' },
    { id: 'startsWith', label: 'Starts with' },
    { id: 'endsWith', label: 'Ends with' },
    { id: 'greaterThan', label: 'Greater than' },
    { id: 'lessThan', label: 'Less than' },
    { id: 'between', label: 'Between' },
    { id: 'in', label: 'In list' }
  ];

  const addFilter = () => {
    setFilters([...filters, { field: '', operator: 'equals', value: '' }]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, field: keyof FilterCriteria, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setFilters(newFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle filter application
    console.log('Applied filters:', filters);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center space-x-4">
              <select
                className="flex-1 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filter.field}
                onChange={(e) => updateFilter(index, 'field', e.target.value)}
              >
                <option value="">Select Field</option>
                {fields.map((field) => (
                  <option key={field.id} value={field.id}>{field.label}</option>
                ))}
              </select>

              <select
                className="flex-1 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filter.operator}
                onChange={(e) => updateFilter(index, 'operator', e.target.value)}
              >
                {operators.map((op) => (
                  <option key={op.id} value={op.id}>{op.label}</option>
                ))}
              </select>

              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Value"
                value={filter.value}
                onChange={(e) => updateFilter(index, 'value', e.target.value)}
              />

              <button
                type="button"
                onClick={() => removeFilter(index)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={addFilter}
          >
            <Filter className="h-4 w-4 mr-2" />
            Add Filter
          </Button>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFilters([{ field: '', operator: 'equals', value: '' }])}
            >
              Reset
            </Button>
            <Button type="submit">
              Apply Filters
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};