import React, { useState } from 'react';
import { Users, MapPin, Briefcase, Edit2, Check, X } from 'lucide-react';
import ContactList from './ContactList';
import AddressList from './AddressList';
import JobList from './JobList';
import qs from 'qs';
import axios from 'axios';

interface EntityDetailsProps {
  entityId: number;
  entity: any;
  reloadFunc:()=>void;
}

const EntityDetails: React.FC<EntityDetailsProps> = ({ entityId, entity, reloadFunc }) => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(entity.entity_name);
  const [editedType, setEditedType] = useState(entity.entity_type);

  const entityTypes = [
    { id: 1, name: "Customer" },
    { id: 2, name: "Vendor" },
    // { id: 5, name: "Type 5" }
  ];

  const handleSave = async () => {
    const data = {
      mode:'editEntity',
      entity_id:entityId,
      entity_name: editedName,
      entity_type: editedType
    }
    const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    try{
      const response = await axios.post(baseUrl + '/j/inc/class/class.entities.php', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      setIsEditing(false);
      reloadFunc();
    } catch (error) {
      console.log('ajax call error:', error);
    }
  };

  const tabs = [
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'jobs', name: 'Jobs', icon: Briefcase },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                  <button onClick={handleSave} className="text-green-500 hover:text-green-600">
                    <Check className="h-5 w-5" />
                  </button>
                  <button onClick={() => setIsEditing(false)} className="text-red-500 hover:text-red-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <select
                  value={editedType}
                  onChange={(e) => setEditedType(Number(e.target.value))}
                  className="px-2 py-1 border rounded"
                >
                  {entityTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold">{entity.entity_name}</h2>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">{entity.entity_type == 1 ? 'Customer' :(entity.entity_type == 2 ? 'Vendor' : 'Admin')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-b">
        <nav className="flex space-x-4 px-4" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-3 py-2 border-b-2 text-sm font-medium`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        {activeTab === 'contacts' && <ContactList entityId={entityId} />}
        {activeTab === 'addresses' && <AddressList entityId={entityId} />}
        {activeTab === 'jobs' && <JobList entityId={entityId} />}
      </div>
    </div>
  );
};

export default EntityDetails;