import { Service, Inject } from "typedi";
import { UserService } from './user.service';
import { User } from './user.model';

@Service()
export class UserController {
    constructor(
        private userService: UserService
    ){
        
    }

    /**
     * @api POST /users
     * 
     * This method creates a new user
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    create(req, res, next){
        if(req.body){
            const user = req.body;

            this.userService.create(user)
                .then((newUser: User) => {
                    res.send(newUser);
                }).catch(()=>{
                    //If the name of the user is repeated, send conflict
                    res.sendStatus(409);
                });
        }
    }

    /**
     * @api PUT /users/:id
     * 
     * This method updates a user that already exists
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    update(req, res, next){
        if(req.body && req.params.id){
            const user = req.body;
            user.id = req.params.id;

            this.userService.update(user)
                .then((updatedUser: User | null) => {
                    res.send(updatedUser);
                });
        }
    }


    /**
     * @api GET /users
     * 
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getAll(req, res, next){
        console.log(req.authUser)
        this.userService.findAll()
            .then((userList: User[]) => {
                res.send(userList);
            });
    }

    /**
     * @api GET /users/:id
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getById(req, res, next){
        if(req.params.id){
            this.userService.findById(req.params.id)
                .then((user: User | null) => {
                    res.send(user);
                });
        }
    }

    /**
     * @api GET /users/:email
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    getByUserEmail(req, res, next){
        if(req.params.email){
            this.userService.findByEmail(req.params.email)
                .then((user: User | null) => {
                    res.send(user);
                });
        }
    }

    /**
     * @api DELETE /users/:email
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    delete(req, res, next){
        if(req.params.id){
            this.userService.delete(req.params.id)
                .then(() => {
                    res.sendStatus(200);
                });
        }
    }

}