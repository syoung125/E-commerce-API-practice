import { CartRepository } from './cart.repository';
import { CartSchema } from './cart.schema';
import { Model } from 'mongoose';
import { Cart } from '../cart.model';
import { Service } from 'typedi';
import { InstanceType } from 'typegoose';

@Service()
export class CartMongoRepository implements CartRepository
{
    private cartModel: Model<InstanceType<CartSchema>>;

    constructor(){
        this.cartModel = new CartSchema().getModelForClass(
            CartSchema, 
            {
                schemaOptions: {collection: 'carts'}
            }
        )
    }

    async create(cart: Cart): Promise<Cart> {
        const cartObj = new this.cartModel(cart);

        return await cartObj.save();
    }    
    
    async findById(cartId: string): Promise<Cart | null> {
        return await this.cartModel.findById(cartId);
    }

    async findByUId(userId: string): Promise<Cart[]>{
        return await this.cartModel.find({userId: userId}).exec();
    }

    async findAll(): Promise<Cart[]> {
        return await this.cartModel.find().exec();
    }
    
    async delete(cartId: string): Promise<null> {
        const {
            ok, n
        } = await this.cartModel.deleteOne({_id: cartId});

        return null;
    }
}