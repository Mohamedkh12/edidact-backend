import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Exercises } from 'src/exercises/entities/exercises.entity';

@Entity()
export class Back_pack {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'idUser' })
  users: User;

  @ManyToOne(() => Exercises, { eager: true })
  @JoinColumn({ name: 'idExercises' })
  exercises: Exercises;
}
