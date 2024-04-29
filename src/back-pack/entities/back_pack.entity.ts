import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exercises } from '../../exercises/entities/exercises.entity';
import { Childs, Parents } from '../../parents/entities/parents.entity';

@Entity()
@Unique(['parent', 'child'])
export class Back_pack {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Parents, (parents) => parents.backpacks)
  @JoinColumn({ name: 'parent_id' })
  parent: Parents;

  @OneToOne(() => Childs, (child) => child.backpack)
  @JoinColumn({ name: 'child_id' })
  child: Childs;

  @ManyToMany(() => Exercises, (exercise) => exercise.backpacks)
  @JoinTable()
  exercises: Exercises[];
}
