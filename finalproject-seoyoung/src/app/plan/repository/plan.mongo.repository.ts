import { PlanRepository } from './plan.repository';
import { PlanSchema } from './plan.schema';
import { Model } from 'mongoose';
import { Plan } from '../plan.model';
import { Service } from 'typedi';
import { InstanceType } from 'typegoose';

@Service()
export class PlanMongoRepository implements PlanRepository{
    
    private planModel: Model<InstanceType<PlanSchema>>;

    constructor() {
        this.planModel = new PlanSchema().getModelForClass(
            PlanSchema, 
            {
                schemaOptions: {collection: 'plans'}
            }
        )
    }
    
    async create(plan: Plan): Promise<Plan> {
        const planObj = new this.planModel(plan);

        /*planObj.save().then(plan => {
            return plan;
        })*/

        return await planObj.save();
    }    
    
    async update(plan: Plan): Promise<Plan | null> {
        const updateDoc = {
            $set: {
                name: plan.name
            }
        };

        const updateResult = await this.planModel.updateOne({_id: plan.id}, updateDoc);

        if(plan.id && updateResult && updateResult.nModified === 1){
            return await this.findById(plan.id);
        }
        return null;
    }
    
    async findById(planId: string): Promise<Plan | null> {
        return await this.planModel.findById(planId);
    }
    
    async findAll(): Promise<Plan[]> {
        return await this.planModel.find().exec();
    }
    
    async delete(planId: string): Promise<null> {
        const {
            ok, n
        } = await this.planModel.deleteOne({_id: planId});

        return null;
    }
    
}