import { OrderRepository } from './repositor/order.repository';
import { Service, Inject } from "typedi";
import { Order } from './order.model';
import { EmailService } from '../sendEmail/email.service';

@Service()
export class OrderService {
    constructor(
        @Inject('order.repostiory') private orderRepository: OrderRepository,
        private emailService: EmailService
    ){}

    async create(order: Order): Promise<Order>{
        //send email
        const message = "confirm purchase";
        this.emailService.send(order.userId, message);
        
        return await this.orderRepository.create(order);
    }

    async update(order: Order): Promise<Order>{
        return await this.orderRepository.update(order);
    }

    async findById(orderId: string): Promise<Order | null>{
        return await this.orderRepository.findById(orderId);
    }

    async findAll(): Promise<Array<Order>>{
        return await this.orderRepository.findAll();
    }
    
    async delete(orderId: string): Promise<null>{
        return await this.orderRepository.delete(orderId);
    }
}