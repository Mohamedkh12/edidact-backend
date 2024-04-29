import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Parents } from '../../../parents/entities/parents.entity';

@Entity()
export class Codes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Parents, (parents) => parents.codes)
  @JoinColumn({ name: 'id_parent' })
  parent: Parents;

  @Column()
  code: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @Column({ type: 'timestamp' })
  dateExpiration: Date;
}
