import { OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Childs } from '../../childs/entities/childs.entity';

export class Parents extends User {
  @OneToMany(() => Childs, (childs) => childs.parents)
  childs: Childs[];
}
