import { Product } from '../product.model';

export interface ProductRepository {
    create(product: Product, storeId: string): Promise<Product>;
    update(product: Product, storeId: string): Promise<Product | null>;
    findById(productId: string): Promise<Product | null>;
    findAll(): Promise<Array<Product>>;
    findAllByStore(storeId: string): Promise<Array<Product>>;
    findAllByCategory(categoryId: string): Promise<Array<Product>>;
    findByRange(min: number, max: number): Promise<Array<Product>>;
    delete(productId: string, storeId: string): Promise<null>;
    updateStock(product: Product): Promise<Product | null>;
}