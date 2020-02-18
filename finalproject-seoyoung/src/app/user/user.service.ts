import { Service, Inject } from "typedi";
import { UserRepository } from './repository/user.repository';
import { User } from './user.model';

@Service()
export class UserService {
    constructor(
        @Inject('user.repository') private userRepository: UserRepository
    ){}

    async create(user: User): Promise<User>{
        return await this.userRepository.create(user);
    }

    async update(user: User): Promise<User | null>{
        return await this.userRepository.update(user);
    }

    async findById(userId: string): Promise<User | null>{
        return await this.userRepository.findById(userId);
    }

    async findByEmail(userEmail: string): Promise<User | null>{
        return await this.userRepository.findByEmail(userEmail);
    }

    async findAll(): Promise<Array<User>>{
        return await this.userRepository.findAll();
    }
    
    async delete(userId: string): Promise<null>{
        return await this.userRepository.delete(userId);
    }
}