import { Roles } from '../../roles/entities/roles.entity';
import { Exercises } from '../../exercises/entities/exercises.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    roleId: number;
    roles: Roles;
    exercises: Exercises[];
    hashPassword(): Promise<void>;
}
