import { StoreRepository } from './store.repository';
import { StoreSchema } from './store.schema';
import { Model } from 'mongoose';
import { Store } from '../store.model';
import { Service } from 'typedi';
import { InstanceType } from 'typegoose';

@Service()
export class StoreMongoRepository implements StoreRepository{
    
    private storeModel: Model<InstanceType<StoreSchema>>;

    constructor() {
        this.storeModel = new StoreSchema().getModelForClass(
            StoreSchema, 
            {
                schemaOptions: {collection: 'stores'}
            }
        )
    }
    
    async create(store: Store): Promise<Store> {
        const storeObj = new this.storeModel(store);

        return await storeObj.save();
    }    
    
    async update(store: Store): Promise<Store | null> {
        const updateDoc = {
            $set: {
                storeName: store.storeName
            }
        };

        const updateResult = await this.storeModel.updateOne({_id: store.id}, updateDoc);

        if(store.id && updateResult && updateResult.nModified === 1){
            return await this.findById(store.id);
        }
        return null;
    }
    
    async findById(storeId: string): Promise<Store | null> {
        return await this.storeModel.findById(storeId);
    }

    async findByEmail(userEmail: string): Promise<Store | null> {
        return await this.storeModel.findOne({email:userEmail}).exec();
    }
    
    async findAll(): Promise<Store[]> {
        return await this.storeModel.find().exec();
    }
    
    async delete(storeId: string): Promise<null> {
        const {
            ok, n
        } = await this.storeModel.deleteOne({_id: storeId});

        return null;
    }
    
}