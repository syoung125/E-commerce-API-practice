import { ReviewRepository } from './review.repository';
import { ReviewSchema } from './review.schema';
import { Model } from 'mongoose';
import { Review } from '../review.model';
import { Service } from 'typedi';
import { InstanceType } from 'typegoose';

@Service()
export class ReviewMongoRepository implements ReviewRepository{
    
    private reviewModel: Model<InstanceType<ReviewSchema>>;

    constructor() {
        this.reviewModel = new ReviewSchema().getModelForClass(
            ReviewSchema, 
            {
                schemaOptions: {collection: 'reviews'}
            }
        )
    }
    
    async create(review: Review): Promise<Review> {
        const reviewObj = new this.reviewModel(review);

        return await reviewObj.save();  //return review
    }    
    
    async update(review: Review): Promise<Review | null> {
        const updateDoc = {
            $set: {
                content: review.content
            }
        };

        const updateResult = await this.reviewModel.updateOne({_id: review.id}, updateDoc);

        if(review.id && updateResult && updateResult.nModified === 1){
            return await this.findById(review.id);
        }
        return null;
    }
    
    async findById(planId: string): Promise<Review | null> {
        return await this.reviewModel.findById(planId);
    }

    async findByProductId(productId: string): Promise<Review[]> {
        return await this.reviewModel.find({productId:productId}).exec();
    }

    async findAll(): Promise<Review[]> {
        return await this.reviewModel.find().exec();
    }
    
    async delete(productId: string): Promise<null> {
        const {
            ok, n
        } = await this.reviewModel.deleteOne({_id: productId});

        return null;
    }
    
}