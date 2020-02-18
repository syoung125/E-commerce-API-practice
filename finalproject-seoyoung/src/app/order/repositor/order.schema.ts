import { Typegoose, prop } from 'typegoose';
import { Order } from '../order.model';

export class OrderSchema extends Typegoose implements Order{
    
    @prop({ required: true })
    userId: string;
   
    @prop({ required: true })
    productId: string;
   
    @prop({ required: true })
    quantity: number;
   
    @prop({ required: true })
    price: number;

    @prop({ required: true })
    date : string;
    
    @prop({ required: true })
    status : number;
}