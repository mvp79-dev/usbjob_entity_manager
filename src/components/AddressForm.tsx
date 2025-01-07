import React, { useState } from 'react';

interface AddressFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    address_street1: initialData?.address_street1 || '',
    address_street2: initialData?.address_street2 || '',
    address_street3: initialData?.address_street3 || '',
    address_city: initialData?.address_city || '',
    address_state: initialData?.address_state || '',
    address_code: initialData?.address_code || '',
    address_country: initialData?.address_country || 'USA'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Street Address</label>
        <input
          type="text"
          required
          placeholder="Street Address Line 1"
          value={formData.address_street1}
          onChange={e => setFormData(prev => ({ ...prev, address_street1: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          value={formData.address_street2}
          onChange={e => setFormData(prev => ({ ...prev, address_street2: e.target.value }))}
          className="block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Additional info (optional)"
          value={formData.address_street3}
          onChange={e => setFormData(prev => ({ ...prev, address_street3: e.target.value }))}
          className="block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            required
            value={formData.address_city}
            onChange={e => setFormData(prev => ({ ...prev, address_city: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            required
            value={formData.address_state}
            onChange={e => setFormData(prev => ({ ...prev, address_state: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
          <input
            type="text"
            required
            value={formData.address_code}
            onChange={e => setFormData(prev => ({ ...prev, address_code: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            required
            value={formData.address_country}
            onChange={e => setFormData(prev => ({ ...prev, address_country: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
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
          Add Address
        </button>
      </div>
    </form>
  );
};

export default AddressForm;