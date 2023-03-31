import { Link } from 'react-router-dom';
import { Contact } from '../../../../interfaces/Contact';

import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';
import arrow from '../../../../assets/images/icons/arrow.svg';

import { Card, ListHeader } from './styles';
import { OrderBy } from '../../../../services/ContactsService';

interface ContactsListProps {
  filteredContacts: Contact[]
  onDeleteContact: (contact: Contact) => void
  orderBy: OrderBy
  onToggleOrderBy: () => void
}

export default function ContactsList({
  filteredContacts,
  onDeleteContact,
  orderBy,
  onToggleOrderBy,
}: ContactsListProps) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={onToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </ListHeader>
      )}
      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>
                {contact.name}
              </strong>
              {contact.category?.name && (
              <small>
                {contact.category.name}
              </small>
              )}
            </div>
            <span>
              {contact.email}
            </span>
            <span>
              {contact.phone}
            </span>
          </div>

          <div className="actions">

            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={trash} alt="Remove" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}
