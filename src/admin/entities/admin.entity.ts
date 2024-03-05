import {User} from '../../users/entities/user.entity'
import { Entity} from 'typeorm';

@Entity()
export class Admin extends User {}
