import { Typegoose, prop } from 'typegoose';
import { User } from '../user.model';

export class UserSchema extends Typegoose implements User{
    
    @prop({ required: true })
    name: string;

    //We want each user's name unique
    @prop({ required: true, unique: true})
    email: string;

    @prop({ required: true })
    password: string;
}