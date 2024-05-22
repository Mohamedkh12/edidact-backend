import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Children } from '../../childs/entities/childs.entity';
import { Back_pack } from '../../back-pack/entities/back_pack.entity';
import { Exclude } from 'class-transformer';

@Entity('parents')
export class Parents extends User {
  @Exclude()
  roleId: number;
  @Column({ type: 'integer' })
  tel: number;
  @OneToMany(() => Children, (Children) => Children.parents, { cascade: true })
  childs: Children[];

  @OneToMany(() => Back_pack, (backpack) => backpack.parent)
  backpacks: Back_pack[];
}

export { Children };
