import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import axios from 'axios';
import qs from 'qs';
import AddressForm from './AddressForm';

interface Address {
  address_id: number;
  address_street1: string;
  address_city: string;
  address_state: string;
  address_code: string;
  enabled: boolean;
}

interface AddressListProps {
  entityId: number;
}

const AddressList: React.FC<AddressListProps> = ({ entityId }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const getAllAddresses = async() => {
    const data = {
      mode:'getaddress',
      entities_id:entityId
    }
    const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    // const baseUrl = 'https://everyusb.io';
    try{
      const response = await axios.post(baseUrl + '/j/inc/class/class.addresses.php', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      if (response.data.data != 'No addresses found.') {
        setAddresses(response.data.data);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.log('ajax call error:', error);
    }
  }

  // Mock data for initial development
  useEffect(() => {
    getAllAddresses();
    // const mockAddresses = [
    //   {
    //     address_id: 1,
    //     address_street1: "123 Main St",
    //     address_city: "Anytown",
    //     address_state: "CA",
    //     address_code: "12345",
    //     enabled: true
    //   }
    // ];
    // setAddresses(mockAddresses);
  }, [entityId]);

  const handleAddAddress = () => {
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = async (addressId: number) => {
    // Implement delete functionality
    console.log('Delete address:', addressId);

    const data = {
      mode:'delete',
      address_id:addressId,
    }
    const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    // const baseUrl = 'https://everyusb.io';
    try{
      const response = await axios.post(baseUrl + '/j/inc/class/class.addresses.php', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      getAllAddresses();
    } catch (error) {
      console.log('ajax call error:', error);
    }
  };

  const handleCancel = () => {
    setIsAddingAddress(false);
  };

  const handleSubmit = async(dataParam:any) => {
    const data = {
      mode:'insert',
      entities_id:entityId,
      address_street1:dataParam.address_street1,
      address_street2:dataParam.address_street2,
      address_street3:dataParam.address_street3,
      address_city:dataParam.address_city,
      address_state:dataParam.address_state,
      address_code:dataParam.address_code,
      address_country:dataParam.address_country
    }
    const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    // const baseUrl = 'https://everyusb.io';
    try{
      const response = await axios.post(baseUrl + '/j/inc/class/class.addresses.php', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      setIsAddingAddress(false);
      getAllAddresses();
    } catch (error) {
      console.log('ajax call error:', error);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Addresses</h3>
        <button
          onClick={handleAddAddress}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Address
        </button>
      </div>

      <div className="space-y-4">
        {addresses && addresses.map((address) => (
          <div
            key={address.address_id}
            className="bg-gray-50 rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="font-medium">{address.address_street1}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {address.address_city}, {address.address_state} {address.address_code}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDeleteAddress(address.address_id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAddingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <AddressForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressList;