import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Parents } from '../../../parents/entities/parents.entity';
import { Admin } from '../../../admin/entities/admin.entity';

@Entity()
export class Codes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Parents, (parents) => parents.codes, { nullable: true })
  @JoinColumn({ name: 'id_parent' })
  parent: Parents;

  @ManyToOne(() => Admin, (admin) => admin.codes, { nullable: true })
  @JoinColumn({ name: 'id_admin' })
  admin: Admin;

  @Column()
  code: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @Column({ type: 'timestamp' })
  dateExpiration: Date;
}
