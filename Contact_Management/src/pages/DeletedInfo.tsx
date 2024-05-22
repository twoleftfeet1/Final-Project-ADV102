
import React from 'react';
import { useContactContext, ContactProvider } from './ContactContext';
//import DeletedInfo from './Deleted-Info-Page';

const DeletedInfoPage: React.FC = () => {
  const { getDeletedContacts } = useContactContext();
  const deletedContacts = getDeletedContacts();

  return (
    <div>
      {deletedContacts.map((contact) => (
        <div key={contact.id}>
          <h3>{contact.name}</h3>
          <p>{contact.email}</p>
          <p>{contact.address}</p>
          <p>{contact.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default DeletedInfoPage;