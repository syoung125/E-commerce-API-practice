import { ProductRepository } from './product.repository';
import { ProductSchema } from './product.schema';
import { Model } from 'mongoose';
import { Product } from '../product.model';
import { Service } from 'typedi';
import { InstanceType } from 'typegoose';

@Service()
export class ProductMongoRepository implements ProductRepository{
    
    private productModel: Model<InstanceType<ProductSchema>>;

    constructor() {
        this.productModel = new ProductSchema().getModelForClass(
            ProductSchema, 
            {
                schemaOptions: {collection: 'products'}
            }
        )
    }
    // needs auth
    async create(product: Product, storeId: string): Promise<Product> {
        const productObj = new this.productModel(product);
        productObj.storeId = storeId;

        return await productObj.save();
    }    

    // needs auth
    async update(product: Product, storeId: string): Promise<Product | null> {
        const updateDoc = {
            $set: {
                categoryId: product.categoryId,
                name: product.name,
                price: product.price,
                descriptiton: product.descriptiton
            }
        };

        const updateResult = await this.productModel.updateOne({_id: product.id}, updateDoc);

        if(product.id && updateResult && updateResult.nModified > 0){
            return await this.findById(product.id);
        }
        return null;
    }
    
    async findById(productId: string): Promise<Product | null> {
        return await this.productModel.findById(productId);
    }
    
    async findAll(): Promise<Array<Product>> {
        return await this.productModel.find().exec();   // what is exec()?
    }

    async findAllByStore(storeId: string): Promise<Array<Product>> {
        return await this.productModel.find({ storeId: storeId }).exec();
    }

    async findAllByCategory(categoryId: string): Promise<Array<Product>>{
        return await this.productModel.find({ categoryId: categoryId }).exec();
    }

    async findByRange(min: number, max: number): Promise<Array<Product>>{
        //price >=($gte) min & price <=($lte) max 
        return await this.productModel.find({price: {$gte: min, $lte: max}}).exec();
    }

    // needs auth
    async delete(productId: string, storeId: string): Promise<null> {
        const {
            ok, n
        } = await this.productModel.deleteOne({_id: productId, storeId: storeId }); // ?

        return null;
    }

    async updateStock(product: Product): Promise<Product | null> {
        const updateDoc = {
            $set: {
                stock: product.stock    
            }
        };

        const updateResult = await this.productModel.updateOne({_id: product.id}, updateDoc);

        if(product.id && updateResult && updateResult.nModified === 1){
            return await this.findById(product.id);
        }
        return null;
    }
    
}