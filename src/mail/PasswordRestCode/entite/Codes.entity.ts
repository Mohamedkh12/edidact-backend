import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../users/entities/user.entity';

@Entity()
export class Codes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (users) => users.codes, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  code: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @Column({ type: 'timestamp' })
  dateExpiration: Date;
}
