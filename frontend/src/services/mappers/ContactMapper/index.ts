import { Contact } from '../../../interfaces/Contact';

interface PersistenceContact {
  id?: string
  name: string
  email?: string
  phone?: string
  category_id?: string
  category_name?: string
}

class ContactMapper {
  toPersistence(domainContact:Contact) {
    return {
      id: domainContact.id,
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.category?.id,
    };
  }

  toDomain(persistenceContact: PersistenceContact) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: persistenceContact.phone,
      category: {
        id: persistenceContact.category_id,
        name: persistenceContact.category_name,
      },
    };
  }
}

export default new ContactMapper();
