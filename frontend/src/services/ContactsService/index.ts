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
}

export default new ContactsService();
