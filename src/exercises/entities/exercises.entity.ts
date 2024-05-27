import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Back_pack } from '../../back-pack/entities/back_pack.entity';

@Entity()
export class Exercises {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  class: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'varchar', nullable: true })
  sub_category: string;

  @Column({ type: 'text' })
  name: string;


  @Column({ type: 'varchar', nullable: true })
  link: string;

  @Column({ type: 'varchar', nullable: true })
  objective: string;
  @Column({ type: 'varchar', nullable: true })
  active: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  deleted_at: Date;
 

  @ManyToMany(() => Back_pack, (backpack) => backpack.exercises, {
    cascade: true,
  })
  backpacks: Back_pack[];
}