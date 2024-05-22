import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { MdRestore } from "react-icons/md";
import { useContactContext, ContactProvider } from './ContactContext';
interface DeletedContact {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface DeletedContactsProps {
  deletedContacts: DeletedContact[];
  restoreContact: (contactId: string) => Promise<void>;
}

const DeletedContacts: React.FC<DeletedContactsProps> = ({ deletedContacts, restoreContact }) => {
  const router = useRouter();

  const handleRestoreContact = async (contactId: string) => {
    await restoreContact(contactId);
    router.reload(); // Refresh the page to show the updated list of deleted contacts
  };

    function toggleContactSelection(id: string): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div>
      <h1
        className="text-2xl font-bold leading-tight tracking-tight text-black md:text-3xl dark:text-white"
        style={{ margin: '15px' }}
      >
        Deleted Contacts
      </h1>

      <div className="overflow-x-auto mt-1" style={{ marginLeft: '50px', marginRight: '20px' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deletedContacts.map((contact) => (
              <tr key={contact.id}>
                <td className="px-6 py-6 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={deletedContacts.includes(contact.id)}
                    onChange={() => toggleContactSelection(contact.id)}
                  />
                </td>
                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{contact.name}</td>
                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{contact.email}</td>
                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{contact.address}</td>
                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-900">{contact.phone}</td>
                <td className="px-2 py-2 whitespace-nowrap text-right">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRestoreContact(contact.id)}
                      className="px-3 py-2 text-white bg-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-2"
                    >
                      <MdRestore size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeletedContacts;