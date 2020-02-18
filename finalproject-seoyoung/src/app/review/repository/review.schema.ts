import { Typegoose, prop } from 'typegoose';
import { Review } from '../review.model';

export class ReviewSchema extends Typegoose implements Review{
    
    @prop({ required: true })
    productId: string;
    
    @prop({ required: true })
    userId: string;
    
    @prop({ required: true })
    date: string;
    
    @prop({ required: true })
    star: number;
    
    @prop({ required: true })
    content: string;



}