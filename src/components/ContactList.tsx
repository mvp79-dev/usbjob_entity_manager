import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import qs from 'qs';

interface Contact {
  contact_id: number;
  contact_name: string;
  emails: string;
  phone_numbers: string;
  enabled: boolean;
}

interface ContactListProps {
  entityId: number;
}

const ContactList: React.FC<ContactListProps> = ({ entityId }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const getAllContacts = async() => {
    const data = {
      mode:'getcontact',
      entities_id:entityId
    }
    const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    try{
      const response = await axios.post(baseUrl + '/j/inc/class/class.contacts.php', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      setContacts(response.data.data);
    } catch (error) {
      console.log('ajax call error:', error);
    }
  }

  // Mock data for initial development
  useEffect(() => {
    getAllContacts();
    // const mockContacts = [
    //   {
    //     contact_id: 1,
    //     contact_name: "John Doe",
    //     emails: "john@example.com",
    //     phone_numbers: "(555) 123-4567",
    //     enabled: true
    //   }
    // ];
    // setContacts(mockContacts);
  }, [entityId]);

  const handleAddContact = () => {
    setIsAddingContact(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = async (contactId: number) => {
    // Implement delete functionality
    console.log('Delete contact:', contactId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Contacts</h3>
        <button
          onClick={handleAddContact}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Contact
        </button>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.contact_id}
            className="bg-gray-50 rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <h4 className="font-medium">{contact.contact_name}</h4>
              <div className="mt-1 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {contact.emails}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {contact.phone_numbers}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditContact(contact)}
                className="text-gray-400 hover:text-gray-500"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteContact(contact.contact_id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;