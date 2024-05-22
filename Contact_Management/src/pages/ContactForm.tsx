import React, { useState } from 'react';
import { useContactContext } from './ContactContext';

interface ContactFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactForm: React.FC<ContactFormProps> = ({ setIsModalOpen }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const { addContact } = useContactContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContact({ name, email, address, phone });
    setName('');
    setEmail('');
    setAddress('');
    setPhone('');
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">Add Contact</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
          <input
            type="text"
            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <input
            type="tel"
            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 mr-4 font-medium text-gray-700 bg-gray-200 rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
