import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    signIn(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        email: string;
        roleId: number;
        roles: import("../roles/entities/roles.entity").Roles;
        exercises: import("../exercises/entities/exercises.entity").Exercises[];
    }>;
}
