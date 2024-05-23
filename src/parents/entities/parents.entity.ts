import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Children } from '../../childs/entities/childs.entity';
import { Back_pack } from '../../back-pack/entities/back_pack.entity';
import * as bcrypt from 'bcrypt';

@Entity('parents')
export class Parents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  username: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'integer', nullable: true })
  tel: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Children, (children) => children.parents, { cascade: true })
  children: Children[];

  @OneToMany(() => Back_pack, (backpack) => backpack.parent)
  backpacks: Back_pack[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export { Children };
