import { connect, Mongoose } from 'mongoose';
import { Service } from 'typedi';

import { config } from '../config/environment';

@Service()
export class Database {

  constructor() {
    this.connectWithDatabase();
  }

  async connectWithDatabase(): Promise<Mongoose> {
    console.log(config);
    return await connect(config.mongodb.uri, config.mongodb.options);
  }

  async flushDb(conn: Mongoose): Promise<void> {
    const collections = await conn.connection.db.collections();

    collections.forEach(async collection => {
      await conn.connection.db.dropCollection(collection.collectionName);
    });
  }
}
