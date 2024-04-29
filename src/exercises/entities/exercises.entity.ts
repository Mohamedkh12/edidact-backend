import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Childs } from '../../childs/entities/childs.entity';
import { Back_pack } from '../../back-pack/entities/back_pack.entity';

@Entity()
export class Exercises {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  assignment: string;

  @ManyToMany(() => Childs, (childs) => childs.exercises, { cascade: true })
  @JoinTable()
  childs: Childs[];

  @ManyToMany(() => Back_pack, (backpack) => backpack.exercises, {
    cascade: true,
  })
  backpacks: Back_pack[];
}
