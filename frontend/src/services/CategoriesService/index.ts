import HttpClient from '../utils/HttpClient';

class CategoriesService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    return this.httpClient.get('/categories');
  }
}

export default new CategoriesService();
