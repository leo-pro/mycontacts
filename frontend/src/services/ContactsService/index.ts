import { Contact } from '../../interfaces/Contact';
import HttpClient from '../utils/HttpClient';

export enum OrderBy {
  ASC = 'asc',
  DESC = 'desc'
}

class ContactsService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy:OrderBy = OrderBy.ASC) {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async getContactById(id: string) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  async createContact(contact:Contact) {
    return this.httpClient.post('/contacts', { body: contact });
  }
}

export default new ContactsService();
