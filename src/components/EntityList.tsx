import React, { useState, useMemo } from 'react';
import { Building2, Search } from 'lucide-react';

interface EntityListProps {
  entities: any[];
  selectedEntityId: number | null;
  onSelectEntity: (id: number) => void;
}

const EntityList: React.FC<EntityListProps> = ({ entities, selectedEntityId, onSelectEntity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedEntities = useMemo(() => {
    return entities
      .filter(entity => 
        entity.entity_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.entity_name.localeCompare(b.entity_name));
  }, [entities, searchTerm]);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-2">Entities</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search entities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>
      <div className="divide-y max-h-[calc(100vh-200px)] overflow-y-auto">
        {filteredAndSortedEntities.map((entity) => (
          <button
            key={entity.entity_id}
            onClick={() => onSelectEntity(entity.entity_id)}
            className={`w-full px-4 py-3 flex items-center hover:bg-gray-50 transition-colors ${
              selectedEntityId === entity.entity_id ? 'bg-indigo-50' : ''
            }`}
          >
            <Building2 className="h-5 w-5 text-gray-400 mr-3" />
            <div className="text-left">
              <div className="font-medium">{entity.entity_name}</div>
              <div className="text-sm text-gray-500">Type: {entity.entity_type}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EntityList;