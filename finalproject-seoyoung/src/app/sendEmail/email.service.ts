import { Service, Inject } from "typedi";
import { UserRepository } from '../user/repository/user.repository';
import { User } from '../user/user.model';

@Service()
export class EmailService {
    private userEmail;
    private message;
    private userRepository: UserRepository;

    constructor(){}

    async setUser(user: User){
        this.userEmail = user.email;
    }
    async setMessage(message: String){
        this.message = 
        "To: "+this.userEmail+"\n"+
        "From: Amazon@email.com\n"+
        message+"Thank you.";
    }

    async send(userId: string, message: string){
        // find user by id
        this.userRepository.findById(userId)
        .then((user: User | null) => {
            if(user != null){
                this.setUser(user);
                this.setMessage(message);
                console.log(this.message);
            }
        })
    }
}