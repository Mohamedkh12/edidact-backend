import { Column,Entity,JoinColumn,ManyToOne,OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Children } from "../../childs/entities/childs.entity";
import { Exercises } from "../../exercises/entities/exercises.entity";

@Entity()
export class ExercisesPlayed {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Children, (children) => children.exercisesPlayed)
  @JoinColumn({ name: 'child_id' })
  children: Children;

  @OneToMany(() => Exercises, (exercices) => exercices.exercisesPlayed)
  @JoinColumn({ name: 'exercices_id' })
  exercices: Exercises;
  
  @Column({ type: 'varchar', nullable: true })
  check: string;
}
