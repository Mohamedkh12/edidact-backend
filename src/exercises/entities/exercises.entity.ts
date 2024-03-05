import { Admin } from '../../admin/entities/admin.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercises {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  category: string;

  @Column()
  image: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  assignment: string;

  @ManyToMany(() => User, (user) => user.exercises)
  users: User[];


}
