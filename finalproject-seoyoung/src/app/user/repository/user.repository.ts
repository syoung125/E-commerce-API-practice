import { User } from '../user.model';

export interface UserRepository {
    create(user: User): Promise<User>;
    update(user: User): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    findByEmail(userEmail: string): Promise<User | null>;
    findAll(): Promise<Array<User>>;
    delete(userId: string): Promise<null>;
}