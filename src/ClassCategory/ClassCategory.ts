import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exercises } from '../exercises/entities/exercises.entity';

@Entity('ClassCategory')
export class ClassCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classe: string;

  @Column()
  category: string;

  @OneToMany(() => Exercises, (exercise) => exercise.category)
  exercise: Exercises[];
}
