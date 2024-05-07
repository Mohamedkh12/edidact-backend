import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToMany(() => Back_pack, (backpack) => backpack.exercises, {
    cascade: true,
  })
  backpacks: Back_pack[];
}
