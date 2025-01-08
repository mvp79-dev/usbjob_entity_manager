import React, { useState, useEffect } from 'react';
import { List, Users, MapPin, Briefcase } from 'lucide-react';
import EntityList from './components/EntityList';
import EntityDetails from './components/EntityDetails';
import axios from 'axios';
import qs from 'qs';

function App() {
  const [selectedEntityId, setSelectedEntityId] = useState<number | null>(null);
  const [entities, setEntities] = useState<any[]>([]);

  const getAllEntities = async() => {
    const data = {
      mode:'getAllEntities'
    }
    const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    try{
      const response = await axios.post(baseUrl + '/j/inc/class/class.entities.php', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      setEntities(response.data.data);
    } catch (error) {
      console.log('ajax call error:', error);
    }
  }


  // Mock data for initial development - replace with API calls
  useEffect(() => {
    getAllEntities();
    // Simulating API call with sample data
    // const mockEntities = [
    //   { entity_id: 1, entity_name: "Every USB", entity_type: 5 },
    //   { entity_id: 2, entity_name: "USKY", entity_type: 2 },
    //   { entity_id: 84, entity_name: "The American View", entity_type: 1 }
    // ];
    // setEntities(mockEntities);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <List className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-semibold">Entity Manager</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex gap-6">
            <div className="w-1/3">
              <EntityList 
                entities={entities}
                selectedEntityId={selectedEntityId}
                onSelectEntity={setSelectedEntityId}
              />
            </div>
            <div className="w-2/3">
              {selectedEntityId ? (
                <EntityDetails 
                  entityId={selectedEntityId}
                  entity={entities.find(e => e.entity_id === selectedEntityId)}
                  reloadFunc={getAllEntities}
                />
              ) : (
                <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
                  Select an entity to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;