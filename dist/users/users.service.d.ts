import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        email: string;
        roleId: number;
        roles: import("../roles/entities/roles.entity").Roles;
        exercises: import("../exercises/entities/exercises.entity").Exercises[];
    }>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByusername(username: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
}
