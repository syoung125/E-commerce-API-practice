import { Service, Inject } from "typedi";
import { OrderService } from './order.service';
import { Order } from './order.model';

@Service()
export class OrderController{
    constructor(
        private orderService: OrderService
    ){}

    /**
     * @api POST /orders
     * 
     * This method creates a new order
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    create(req, res, next){
        if(req.body){
            const order = req.body;

            this.orderService.create(order)
                .then((newOrder: Order) => {
                    res.send(newOrder);
                });
        }
    }

    /**
     * @api PUT /orders/:id
     * 
     * This method updates a order status that already exists
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req, res, next){
        if(req.body && req.params.id){
            const order = req.body;
            order.id = req.params.id;

            this.orderService.update(order)
                .then((updatedOrder: Order | null) => {
                    res.send(updatedOrder);
                });
        }
    }

     /**
     * @api GET /orders
     * 
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAll(req, res, next){
        console.log(req.authUser)
        this.orderService.findAll()
            .then((orderList: Order[]) => {
                res.send(orderList);
            });
    }

    /**
     * @api GET /orders/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getById(req, res, next){
        if(req.params.id){
            this.orderService.findById(req.params.id)
                .then((order: Order | null) => {
                    res.send(order);
                });
        }
    }

    /**
     * @api DELETE /orders/:id
     * 
     * Delete a order by Id when is confirmed or canceled
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    delete(req, res, next){
        if(req.params.id){
            this.orderService.delete(req.params.id)
                .then(() => {
                    res.sendStatus(200);
                });
        }
    }

}