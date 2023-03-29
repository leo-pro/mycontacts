import { Category } from '../../../interfaces/Category';

class CategoryMapper {
  toDomain(persistenceCategory: Category) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

export default new CategoryMapper();
