import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exercises } from '../../exercises/entities/exercises.entity';

@Entity()
export class Back_pack {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type:'int'})
  idUser: number;
  @Column({type:'int'})
  idExercises: number;
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'idUser' })
  users: User;

  @ManyToOne(() => Exercises, { eager: true })
  @JoinColumn({ name: 'idExercises' })
  exercises: Exercises;
}
