import { Contact } from '../../interfaces/Contact';
import ContactMapper from '../mappers/ContactMapper';
import HttpClient from '../utils/HttpClient';

export enum OrderBy {
  ASC = 'asc',
  DESC = 'desc'
}

class ContactsService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${process.env.REACT_APP_API_URL}`);
  }

  async listContacts(orderBy:OrderBy = OrderBy.ASC) {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id: string) {
    const contact = await this.httpClient.get(`/contacts/${id}`);

    return ContactMapper.toDomain(contact);
  }

  async createContact(contact:Contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.post('/contacts', { body });
  }

  async updateContact(id: string, contact:Contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.put(`/contacts/${id}`, { body });
  }

  async deleteContact(id: string) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
