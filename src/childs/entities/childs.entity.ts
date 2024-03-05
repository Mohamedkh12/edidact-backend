import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Parents } from '../../parents/entities/parents.entity';
@Entity('childs')
export class Childs extends User {
  @Column({ type: 'text'})
  username: string;
  @Column()
  id_parent: number;
  @ManyToOne(() => Parents, (parents) => parents.childs)
  @JoinColumn({ name: 'id_parent' })
  parents: Parents;
}
