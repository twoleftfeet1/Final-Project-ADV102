import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';

interface Contact {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface ContactContextType {
  contacts: Contact[];
  deletedContacts: Contact[]; 
  addContact: (contact: Omit<Contact, 'id'>) => Promise<void>;
  deleteContact: (contactId: string) => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactContext must be used within a ContactProvider');
  }
  return context;
};

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deletedContacts, setDeletedContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      const contactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contact[];
      setContacts(contactsData);
    };

    const fetchDeletedContacts = async () => {
      const querySnapshot = await getDocs(collection(db, 'deletedContacts')); 
      const deletedContactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contact[];
      setDeletedContacts(deletedContactsData);
    };

    fetchContacts();
    fetchDeletedContacts(); 
  }, []);

  const addContact = async (contact: Omit<Contact, 'id'>) => {
    const docRef = await addDoc(collection(db, 'contacts'), contact);
    setContacts((prevContacts) => [
      ...prevContacts,
      { id: docRef.id, ...contact },
    ]);
  };

  const deleteContact = async (contactId: string) => {
   
    await deleteDoc(doc(db, 'contacts', contactId));
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );

   
    const contactToMove = contacts.find((contact) => contact.id === contactId);
    if (contactToMove) {
      await addDoc(collection(db, 'deletedContacts'), contactToMove);
      setDeletedContacts((prevDeletedContacts) => [
        ...prevDeletedContacts,
        contactToMove,
      ]);
    }
  };

  return (
    <ContactContext.Provider value={{ contacts, deletedContacts, addContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
