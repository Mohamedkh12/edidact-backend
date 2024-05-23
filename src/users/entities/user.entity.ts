import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from '../../roles/entities/roles.entity';
import { Codes } from '../../mail/PasswordRestCode/entite/Codes.entity';
import { Children } from '../../childs/entities/childs.entity';
import { Parents } from '../../parents/entities/parents.entity';

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

  @Column({ nullable: true })
  roleId: number;
  @OneToMany(() => Codes, (code) => code.user)
  codes: Codes[];

  @ManyToOne(() => Roles, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  roles: Roles;

  @OneToOne(() => Parents, (parent) => parent.user)
  parents: Parents;

  @OneToOne(() => Children, (child) => child.user)
  children: Children;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
