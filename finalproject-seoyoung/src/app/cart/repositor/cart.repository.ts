import { Cart } from '../cart.model';

export interface CartRepository {
    create(cart: Cart): Promise<Cart>;
    findById(cartId: string): Promise<Cart | null>;
    findByUId(userId: string): Promise<Cart[]>;
    findAll(): Promise<Array<Cart>>;
    delete(cartId: string): Promise<null>;
}