import { CartRepository } from './repositor/cart.repository';
import { Service, Inject } from "typedi";
import { Cart } from './cart.model';

@Service()
export class CartService {
    constructor(
        @Inject('cart.repostiory') private cartRepository: CartRepository
    ){}

    async create(cart: Cart): Promise<Cart>{
        return await this.cartRepository.create(cart);
    }

    async findById(cartId: string): Promise<Cart | null>{
        return await this.cartRepository.findById(cartId);
    }

    async findByUId(cartId: string): Promise<Array<Cart>>{
        return await this.cartRepository.findByUId(cartId);
    }

    async findAll(): Promise<Array<Cart>>{
        return await this.cartRepository.findAll();
    }
    
    async delete(cartId: string): Promise<null>{
        return await this.cartRepository.delete(cartId);
    }
}