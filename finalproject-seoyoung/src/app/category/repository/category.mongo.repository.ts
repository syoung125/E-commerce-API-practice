import { CategoryRepository } from './category.repository';
import { CategorySchema } from './category.schema';
import { Category } from '../category.model';
import { Model } from 'mongoose';
import { Service } from "typedi";
import { InstanceType } from "typegoose";

@Service()
export class CategoryMongoRepository implements CategoryRepository
{
    private categoryModel: Model<InstanceType<CategorySchema>>;

    constructor(){
        this.categoryModel = new CategorySchema().getModelForClass(
            CategorySchema,
            {
                schemaOptions: {collection: 'categorys'}
            }
        )
    }

    async create(category: Category): Promise<Category>{
        const categoryObj = new this.categoryModel(category);
        return await categoryObj.save();
    }

    async update(category: Category): Promise<Category | null>{
        const updateDoc = {
            $set: {
                name: category.name
            }
        }

        const updateResult = await this.categoryModel.updateOne({_id: category.id}, updateDoc);

        if(category.id && updateResult && updateResult.nModified === 1){
            return await this.findById(category.id);
        }
        return null;
    }
    
    async findById(categoryId: string): Promise<Category | null>{
        return await this.categoryModel.findById(categoryId);
    }

    async findAll(): Promise<Array<Category>>{
        return await this.categoryModel.find().exec();
    }

    async delete(categoryId: string): Promise<null>{
        const {
            ok, n
        } = await this.categoryModel.deleteOne({_id: categoryId});
        
        return null;
    }

}