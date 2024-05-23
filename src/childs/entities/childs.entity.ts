import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Parents } from '../../parents/entities/parents.entity';
import { Back_pack } from '../../back-pack/entities/back_pack.entity';
import * as bcrypt from 'bcrypt';

@Entity('Children')
export class Children {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  classe: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @ManyToOne(() => Parents, (parents) => parents.children)
  @JoinColumn({ name: 'id_parent' })
  parents: Parents;

  @OneToOne(() => Back_pack, (backpack) => backpack.child)
  backpack: Back_pack;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
