import 'reflect-metadata';

import { Mongoose } from 'mongoose';
import { Container } from 'typedi';

import { MongoIdValidator } from './app/validator/validator.mongo';
import { Database } from './database/database';
import { Server } from './server/server';
import { PlanMongoRepository } from './app/plan/repository/plan.mongo.repository';
import { PlanService } from './app/plan/plan.service';
import { ProductMongoRepository } from './app/product/repository/product.mongo.repository';
import { UserMongoRepository } from './app/user/repository/user.mongo.repository';
import { CategoryMongoRepository } from './app/category/repository/category.mongo.repository';
import { CartMongoRepository } from './app/cart/repositor/cart.mongo.repository';
import { StoreMongoRepository } from './app/store/repository/store.mongo.repository';
import { orderMongoRepository } from './app/order/repositor/order.mongo.repository';
import { ReviewMongoRepository } from './app/review/repository/review.mongo.repository';

init();

function init(): void {
  const containterDB = Container.get(Database);

  Container.set('database.validator', new MongoIdValidator());

  _initResourceDependencies();

  containterDB.connectWithDatabase()
    .then((conn: Mongoose) => {
      Container.get(Server);
    })
    .catch((err) => {
      console.error('MongoDB connection error: ' + err);
      process.exit(-1);
    });
}

function _initResourceDependencies(): void {
  Container.set('user.repository', new UserMongoRepository);
  Container.set('store.repository', new StoreMongoRepository);
  Container.set('category.repository', new CategoryMongoRepository);
  Container.set('plan.repository', new PlanMongoRepository);
  Container.set('product.repository', new ProductMongoRepository);
  Container.set('cart.repository', new CartMongoRepository);
  Container.set('order.repository', new orderMongoRepository);
  Container.set('review.repository', new ReviewMongoRepository);
}
