import { Service, Inject } from "typedi";
import { ProductRepository } from './repository/product.repository';
import { Product } from './product.model';

@Service()
export class ProductService {
    constructor(
        @Inject('product.repository') private productRepository: ProductRepository
    ){}
    
    async create(product: Product, storeId: string): Promise<Product>{
        return await this.productRepository.create(product, storeId);
    }
    
    async update(product: Product, storeId: string): Promise<Product | null>{
        return await this.productRepository.update(product, storeId);
    }
    
    async findById(productId: string): Promise<Product | null>{
        return await this.productRepository.findById(productId);
    }
    
    async findAll(): Promise<Array<Product>>{
        return await this.productRepository.findAll();
    }
    
    async findAllByStore(storeId: string): Promise<Array<Product>>{
        return await this.productRepository.findAllByStore(storeId);
    }
    
    async findAllByCategory(categoryId: string): Promise<Array<Product>>{
        return await this.productRepository.findAllByStore(categoryId);
    }
    
    async findByRange(min: number, max: number): Promise<Array<Product>>{
        return await this.productRepository.findByRange(min, max);
    }
    
    async delete(productId: string, storeId: string): Promise<null>{
        return await this.productRepository.delete(productId, storeId);
    }

    async updateStock(product: Product): Promise<Product | null>{
        return await this.productRepository.updateStock(product);
    }

}