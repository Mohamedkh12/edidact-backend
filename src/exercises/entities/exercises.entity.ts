import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Back_pack } from '../../back-pack/entities/back_pack.entity';
import { ExercisesPlayed } from '../../exercises-played/entities/exercises-played.entity';

@Entity()
export class Exercises {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  classe: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'varchar', nullable: true })
  sub_category: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  link: string;

  @Column({ type: 'varchar', nullable: true })
  objective: string;

  @Column({ type: 'varchar', nullable: true })
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @ManyToMany(() => Back_pack, (backpack) => backpack.exercises, {
    cascade: true,
  })
  backpacks: Back_pack[];

  @OneToMany(() => ExercisesPlayed, (exercices) => exercices.exercices)
  exercisesPlayed: ExercisesPlayed;

}
