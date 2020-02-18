import { Typegoose, prop } from 'typegoose';
import { Plan } from '../plan.model';

export class PlanSchema extends Typegoose implements Plan{
    
    @prop({ required: true })
    name: string;
    
    @prop({ default: true})
    active?: boolean | undefined;

    @prop({ required: true })
    amount: number;

    @prop({ required: true })
    currency: string;

    @prop({ required: true })
    interval: string;
    
    @prop({ required: true })
    interval_count: number;




}