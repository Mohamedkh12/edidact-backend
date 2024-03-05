import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  name: string;

  @OneToMany(() => User, (user) => user.roles)
  users: User[];
}