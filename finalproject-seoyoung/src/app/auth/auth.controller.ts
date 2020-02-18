import { Service, Inject, Token } from "typedi";
//import { ProductService } from './auth.service';
//import { Product } from './auth.model';
import * as jwt from 'jsonwebtoken';
import { development } from '../../config/environment/development';
import { config } from '../../config/environment';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Service()
export class AuthController {
    constructor(
        private userService: UserService
    ){
        
    }

    auth(req, res){
        if(req.body.email && req.body.password){
            this.userService.findByEmail(req.body.email).then((user: User | null) => {
                
                if (user!=null){
                    if(req.body.email ===user.email && req.body.password===user.password){                
                        //Access granted
                        const payload = {
                            id: user.id,
                            email: user.email
                            // role: user.role
                        };
        
                        const token = jwt.sign(payload, development.secretJwt);
                        res.status(200).json({'token':token})
                    } else {
                        res.sendStatus(401);
                    }
                } else{
                    // User not found
                    res.sendStatus(404);
                } 
            });
        }
    }

    public verifyApiRequest(req, res, next){
        const token = req.headers['access-token'];

        if(token){
            //Verify the token
            jwt.verify(token, config.secretJwt, (err, decoded) => {
                if(err){
                    res.status(401).json({
                        message: 'Invalid token'
                    });
                }else{
                    req.authUser = decoded;
                    next();
                    
                    // if(decoded.role == 'admin'){
                    //     req.authUser = decoded;
                    //     next();
                    // }else if(decoded.role == 'store'){
                    //     req.authUser = decoded;
                    //     next();
                    // }else if(decoded.role == 'user'){
                    //     req.authUser = decoded;
                    //     next();
                    // }else{
                    //     res.status(401).json({
                    //         message: 'Invalid token'
                    //     });
                    // }
                }
            })
        }else{
            //No token
            res.status(401).json({
                message: 'Token not found'
            });
        }
    }
}