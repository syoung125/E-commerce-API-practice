import { Typegoose, prop } from 'typegoose';
import { Cart } from '../cart.model';

export class CartSchema extends Typegoose implements Cart{
    
    @prop({ required: true })
    userId: string;
   
    @prop({ required: true })
    productId: string;
   
    @prop({ required: true })
    quantity: number;
   
    @prop({ required: true })
    price: number;
}