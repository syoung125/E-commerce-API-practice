import { Service, Inject } from "typedi";
import { CategoryRepository } from './repository/category.repository';
import { Category } from './category.model';

@Service()
export class CategoryService
{
    constructor(
        @Inject('category.repository') private categoryRepository: CategoryRepository
    ){}

    async create(category: Category): Promise<Category>{
        return await this.categoryRepository.create(category);
    }

    async update(category: Category): Promise<Category | null>{
        return await this.categoryRepository.update(category);
    }

    async findById(categoryId: string): Promise<Category | null>{
        return await this.categoryRepository.findById(categoryId);
    }

    async findAll(): Promise<Array<Category>>{
        return await this.categoryRepository.findAll();
    }
    
    async delete(categoryId: string): Promise<null>{
        return await this.categoryRepository.delete(categoryId);
    }
}