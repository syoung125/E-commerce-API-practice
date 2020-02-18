import { Typegoose, prop } from 'typegoose';
import { Product } from '../../product/product.model';

export class ProductSchema extends Typegoose implements Product{

    @prop({ required: true })
    categoryId: string;

    @prop({ required: true })
    storeId: string;
    
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    price: number;

    @prop({ required: true })
    stock: number;
    
    @prop({ required: true })
    descriptiton: string;
    
}