import { Category } from "../category.model";

export interface CategoryRepository
{
    create(category: Category): Promise<Category>;
    update(category: Category): Promise<Category | null>;
    findById(categoryId: string): Promise<Category | null>;
    findAll(): Promise<Array<Category>>;
    delete(categoryId: string): Promise<null>;
}