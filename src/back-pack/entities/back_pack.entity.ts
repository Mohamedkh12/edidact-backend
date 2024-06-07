import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exercises } from '../../exercises/entities/exercises.entity';
import { Parents } from '../../parents/entities/parents.entity';
import { Children } from '../../childs/entities/childs.entity';

@Entity()
@Unique(['parent', 'child'])
export class Back_pack {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Parents, (parents) => parents.backpacks)
  @JoinColumn({ name: 'parent_id' })
  parent: Parents;

  @OneToOne(() => Children, (child) => child.backpack, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'child_id' })
  child: Children;

  @ManyToMany(() => Exercises, (exercise) => exercise.backpacks)
  @JoinTable()
  exercises: Exercises[];
  
}
