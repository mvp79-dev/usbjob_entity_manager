import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ContactFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
  isEdit?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onCancel, initialData, isEdit }) => {
  const checkAccessStatus = (contact_acl: string, position: number): boolean => {
    if (!contact_acl) {
      return false;
    }
    if (position < 0 || position >= contact_acl.length) {
      return false; // Out of bounds
    }
    return contact_acl[position] > '0'; // Check if the character at the position is greater than '0'
  };
  

  const [formData, setFormData] = useState({
    contact_name: initialData?.contact_name || '',
    email: initialData?.emails?.split(',') || [''],
    phone_number: initialData?.phone_numbers?.split(',') || [''],
    contact_acl: initialData?.contact_acl || 0,
    admin: checkAccessStatus(initialData?.contact_acl, 0),
    billing: checkAccessStatus(initialData?.contact_acl, 1),
    shipping: checkAccessStatus(initialData?.contact_acl, 2),
    artwork: checkAccessStatus(initialData?.contact_acl, 3),
    data: checkAccessStatus(initialData?.contact_acl, 4)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let contact_acl = 0;
    if (formData.admin) contact_acl |= 10000;
    if (formData.billing) contact_acl |= 1000;
    if (formData.shipping) contact_acl |= 100;
    if (formData.artwork) contact_acl |= 10;
    if (formData.data) contact_acl |= 1;

    onSubmit({
      ...formData,
      contact_acl,
      phone_types_id: 2 // Default work type as per API
    });
  };

  const addField = (field: 'email' | 'phone_number') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field: 'email' | 'phone_number', index: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index)
    }));
  };

  const updateField = (field: 'email' | 'phone_number', index: any, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: any, i: number) => i === index ? value : item)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={formData.contact_name}
          onChange={e => setFormData(prev => ({ ...prev, contact_name: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Addresses</label>
        {formData.email.map((email: string | number | readonly string[] | undefined, index: React.Key | null | undefined) => (
          <div key={index} className="flex mt-1">
            <input
              type="email"
              required
              value={email}
              onChange={e => updateField('email', index, e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {formData.email.length > 1 && (
              <button
                type="button"
                onClick={() => removeField('email', index)}
                className="ml-2 text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('email')}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          Add another email
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
        {formData.phone_number.map((phone: string | number | readonly string[] | undefined, index: React.Key | null | undefined) => (
          <div key={index} className="flex mt-1">
            <input
              type="tel"
              required
              value={phone}
              onChange={e => updateField('phone_number', index, e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {formData.phone_number.length > 1 && (
              <button
                type="button"
                onClick={() => removeField('phone_number', index)}
                className="ml-2 text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('phone_number')}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          Add another phone number
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Access Control</label>
        <div className="space-y-2">
          {[
            { key: 'admin', label: 'Admin', value: 10000 },
            { key: 'billing', label: 'Billing', value: 1000 },
            { key: 'shipping', label: 'Shipping', value: 100 },
            { key: 'artwork', label: 'Artwork', value: 10 },
            { key: 'data', label: 'Data', value: 1 }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                checked={formData[key as keyof typeof formData]}
                onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.checked }))}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300"
              />
              <label htmlFor={key} className="ml-2 text-sm text-gray-700">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {isEdit ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;