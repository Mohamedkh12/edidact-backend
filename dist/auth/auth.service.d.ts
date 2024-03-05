import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly userRepository;
    constructor(usersService: UsersService, jwtService: JwtService, userRepository: Repository<User>);
    validateUser(username: string, password: string): Promise<any>;
    signIn(username: string, password: string): Promise<{
        access_token: string;
    }>;
    refreshToken(user: User): {
        refreshToken: string;
    };
}
