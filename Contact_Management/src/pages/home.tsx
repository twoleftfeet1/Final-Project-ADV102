import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ContactForm from './ContactForm';
//import DeletedContacts from './DeletedContacts';
import { useContactContext, ContactProvider } from './ContactContext';
import { useAuthContext } from '../Context/AuthContext';
import { MdDelete } from "react-icons/md";

const Home: React.FC = () => {
  const router = useRouter();
  const { contacts, deleteContact } = useContactContext();
  useAuthContext();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeletedContacts, setShowDeletedContacts] = useState(false);
  const [editContact, setEditContact] = useState(null);

  const handleLogout = () => {
    router.push('/');
  };

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts((prevSelectedContacts) =>
      prevSelectedContacts.includes(contactId)
        ? prevSelectedContacts.filter((id) => id !== contactId)
        : [...prevSelectedContacts, contactId]
    );
  };



  const handleDeleteContact = async (id: string) => {
    deleteContact(id);
    setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
  };



  return (
    <section className="custom-bg min-h-screen">
      {isModalOpen && <ContactForm setIsModalOpen={setIsModalOpen} />}

      <h1
        className="text-2xl font-bold leading-tight tracking-tight text-black md:text-3xl dark:text-white"
        style={{ margin: '15px' }}
      >
        Welcome User!
      </h1>

      <div className="mb-2" style={{ marginLeft: '50px', marginTop: '20px' }}>
        <h3 className="text-1xl font-semibold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
          All Contacts
        </h3>
        <div className="flex space-x-4 mt-2">
          <button
            onClick={() => {
              setEditContact(null);
              setIsModalOpen(true);
            }}
            className="px-2 py-1 font-medium text-white bg-blue-600 shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-200"
          >
            Add New Contact
          </button>
          
        </div>
      </div>

     

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
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="px-6 py-6 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={selectedContacts.includes(contact.id)}
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
                      onClick={() => handleDeleteContact(contact.id)} 
                      className="px-3 py-2 text-white bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ml-2"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 bg-red-600 hover:bg-white-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
      >
        Logout
      </button>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <ContactProvider>
      <Home />
      
    </ContactProvider>
  );
};

export default App;