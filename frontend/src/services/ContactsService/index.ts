import { Contact } from '../../interfaces/Contact';
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
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async getContactById(id: string) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  async createContact(contact:Contact) {
    return this.httpClient.post('/contacts', { body: contact });
  }

  async updateContact(id: string, contact:Contact) {
    return this.httpClient.put(`/contacts/${id}`, { body: contact });
  }

  async deleteContact(id: string) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
