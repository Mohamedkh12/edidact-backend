import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from '../../roles/entities/roles.entity';
import { Exercises } from '../../exercises/entities/exercises.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column()
  roleId: number;

  @ManyToOne(() => Roles, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  roles: Roles;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
