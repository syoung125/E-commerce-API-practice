import { Typegoose, prop } from "typegoose";
import { Category } from "../category.model";

export class CategorySchema extends Typegoose implements Category
{
    @prop({ required: true })
    name: string;    
}