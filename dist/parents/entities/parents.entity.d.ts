import { User } from '../../users/entities/user.entity';
import { Childs } from '../../childs/entities/childs.entity';
export declare class Parents extends User {
    childs: Childs[];
}
