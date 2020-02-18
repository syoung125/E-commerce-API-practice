import { ObjectId } from 'mongodb';
import { Service } from 'typedi';

import { IdValidator } from './validator';

@Service()
export class MongoIdValidator implements IdValidator {

  validate(value: string): boolean {
    return ObjectId.isValid(value);
  }

}
