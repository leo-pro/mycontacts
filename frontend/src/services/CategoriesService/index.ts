import CategoryMapper from '../mappers/CategoryMapper';
import HttpClient from '../utils/HttpClient';

class CategoriesService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(`${process.env.REACT_APP_API_URL}`);
  }

  async listCategories() {
    const categories = await this.httpClient.get('/categories');

    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();
