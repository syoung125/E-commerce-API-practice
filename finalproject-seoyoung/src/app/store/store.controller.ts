import { Service, Inject } from "typedi";
import { StoreService } from './store.service';
import { Store } from './store.model';

@Service()
export class StoreController {
    constructor(
        private storeService: StoreService
    ){
        
    }

    /**
     * @api POST /stores
     * 
     * This method creates a new store
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    create(req, res, next){
        if(req.body){
            const store = req.body;

            this.storeService.create(store)
                .then((newStore: Store) => {
                    res.send(newStore);
                }).catch(()=>{
                    //If the name of the user is repeated, send conflict
                    res.sendStatus(409);
                });
        }
    }

    /**
     * @api PUT /stores/:id
     * 
     * This method updates a store that already exists
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req, res, next){
        if(req.body && req.params.id){
            const store = req.body;
            store.id = req.params.id;

            this.storeService.update(store)
                .then((updatedStore: Store | null) => {
                    res.send(updatedStore);
                });
        }
    }


    /**
     * @api GET /stores
     * 
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAll(req, res, next){
        console.log(req.authUser)
        this.storeService.findAll()
            .then((storeList: Store[]) => {
                res.send(storeList);
            });
    }

    /**
     * @api GET /stores/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getById(req, res, next){
        if(req.params.id){
            this.storeService.findById(req.params.id)
                .then((store: Store | null) => {
                    res.send(store);
                });
        }
    }

    /**
     * @api GET /stores/:email
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    
    getByUserEmail(req, res, next){
        if(req.params.email){
            this.storeService.findByEmail(req.params.email)
                .then((store: Store | null) => {
                    res.send(store);
                });
        }
    }

    /**
     * @api DELETE /stores/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    delete(req, res, next){
        if(req.params.id){
            this.storeService.delete(req.params.id)
                .then(() => {
                    res.sendStatus(200);
                });
        }
    }

}