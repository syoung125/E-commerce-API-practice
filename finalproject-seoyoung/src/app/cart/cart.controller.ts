import { Service, Inject } from "typedi";
import { CartService } from './cart.service';
import { Cart } from './cart.model';

@Service()
export class CartController{
    constructor(
        private cartService: CartService
    ){}

    /**
     * @api POST /carts
     * 
     * This method creates a new cart
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    create(req, res, next){
        if(req.body){
            const cart = req.body;

            this.cartService.create(cart)
                .then((newCart: Cart) => {
                    res.send(newCart);
                });
        }
    }

     /**
     * @api GET /carts
     * 
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAll(req, res, next){
        console.log(req.authUser)
        this.cartService.findAll()
            .then((cartList: Cart[]) => {
                res.send(cartList);
            });
    }

    /**
     * @api GET /carts/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getById(req, res, next){
        if(req.params.id){
            this.cartService.findById(req.params.id)
                .then((cart: Cart | null) => {
                    res.send(cart);
                });
        }
    }

    /**
     * @api GET /user/:id/carts
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getByUId(req, res, next){
        if(req.params.id){
            this.cartService.findByUId(req.params.id)
                .then((cart: Cart[]) => {
                    res.send(cart);
                });
        }
    }

    /**
     * @api DELETE /carts/:id
     * 
     * Delete a prodcut by Id when is confirmed or canceled
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    delete(req, res, next){
        if(req.params.id){
            this.cartService.delete(req.params.id)
                .then(() => {
                    res.sendStatus(200);
                });
        }
    }

}