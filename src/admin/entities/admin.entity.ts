import {User} from '../../users/entities/user.entity'
import { Entity, OneToMany } from 'typeorm';
import { Codes } from '../../mail/PasswordRestCode/entite/Codes.entity';

@Entity()
export class Admin {}
