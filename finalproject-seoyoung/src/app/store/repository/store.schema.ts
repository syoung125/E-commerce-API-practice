import { Typegoose, prop } from 'typegoose';
import { Store } from '../store.model';

export class StoreSchema extends Typegoose implements Store{
    
    @prop({ required: true })
    storeName: string;

    //We want each user's name unique
    @prop({ required: true, unique: true})
    email: string;

    @prop({ required: true })
    password: string;

}
