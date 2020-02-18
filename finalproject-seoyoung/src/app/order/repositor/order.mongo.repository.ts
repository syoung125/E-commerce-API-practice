import { OrderRepository } from './order.repository';
import { OrderSchema } from './order.schema';
import { Model } from 'mongoose';
import { Order } from '../order.model';
import { Service } from 'typedi';
import { InstanceType } from 'typegoose';

@Service()
export class orderMongoRepository implements OrderRepository
{
    private orderModel: Model<InstanceType<OrderSchema>>;

    constructor(){
        this.orderModel = new OrderSchema().getModelForClass(
            OrderSchema, 
            {
                schemaOptions: {collection: 'orders'}
            }
        )
    }

    async create(order: Order): Promise<Order> {
        const cartObj = new this.orderModel(order);
        return await cartObj.save();
    }    
    
    async update(order: Order): Promise<Order | null> {
        const updateDoc = {
            $set: {
                status: order.status
            }
        };

        const updateResult = await this.orderModel.updateOne({_id: order.id}, updateDoc);

        if(order.id && updateResult && updateResult.nModified === 1){
            return await this.findById(order.id);
        }
        return null;
    }

    async findById(orderId: string): Promise<Order | null> {
        return await this.orderModel.findById(orderId);
    }
    
    async findAll(): Promise<Order[]> {
        return await this.orderModel.find().exec();
    }
    
    async delete(orderId: string): Promise<null> {
        const {
            ok, n
        } = await this.orderModel.deleteOne({_id: orderId});

        return null;
    }
}