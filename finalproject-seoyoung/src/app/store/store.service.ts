import { Service, Inject } from "typedi";
import { StoreRepository } from './repository/store.repository';
import { Store } from './store.model';

@Service()
export class StoreService {
    constructor(
        @Inject('store.repository') private storeRepository: StoreRepository
    ){}

    async create(store: Store): Promise<Store>{
        return await this.storeRepository.create(store);
    }

    async update(store: Store): Promise<Store | null>{
        return await this.storeRepository.update(store);
    }

    async findById(storeId: string): Promise<Store | null>{
        return await this.storeRepository.findById(storeId);
    }

    async findByEmail(storeEmail: string): Promise<Store | null>{
        return await this.storeRepository.findByEmail(storeEmail);
    }

    async findAll(): Promise<Array<Store>>{
        return await this.storeRepository.findAll();
    }
    
    async delete(storeId: string): Promise<null>{
        return await this.storeRepository.delete(storeId);
    }
}