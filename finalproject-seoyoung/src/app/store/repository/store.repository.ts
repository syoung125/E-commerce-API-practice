import { Store } from '../store.model';

export interface StoreRepository {
    create(store: Store): Promise<Store>;
    update(store: Store): Promise<Store | null>;
    findById(storeId: string): Promise<Store | null>;
    findByEmail(storeEmail: string): Promise<Store | null>;
    findAll(): Promise<Array<Store>>;
    delete(storeId: string): Promise<null>;
}