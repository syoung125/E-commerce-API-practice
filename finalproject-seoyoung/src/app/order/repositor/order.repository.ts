import { Order } from '../order.model';

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    update(order: Order): Promise<Order>;
    findById(orderId: string): Promise<Order | null>;
    findAll(): Promise<Array<Order>>;
    delete(orderId: string): Promise<null>;
}