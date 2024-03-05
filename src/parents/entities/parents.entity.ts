import { Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Childs } from '../../childs/entities/childs.entity';

@Entity('parents')
export class Parents extends User {
  @OneToMany(() => Childs, (childs) => childs.parents)
  childs: Childs[];
}
export { Childs };

