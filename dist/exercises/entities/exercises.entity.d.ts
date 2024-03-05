import { User } from '../../users/entities/user.entity';
export declare class Exercises {
    id: number;
    category: string;
    image: string;
    name: string;
    description: string;
    assignment: string;
    users: User[];
}
