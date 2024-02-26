import { JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Parents } from '../../parents/entities/parents.entity';

export class Childs extends User {
  @ManyToOne(() => Parents, (parents) => parents.childs)
  @JoinColumn({ name: 'id_parent' })
  parents: Parents;
}
