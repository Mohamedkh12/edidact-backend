import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from '../../roles/entities/roles.entity';
import { Exercises } from '../../exercises/entities/exercises.entity';
import { Childs } from '../../childs/entities/childs.entity';

@Entity('users')
@Unique(['username', 'email'])
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

  @ManyToMany(() => Exercises, (exercises) => exercises.users)
  @JoinTable()
  exercises: Exercises[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
