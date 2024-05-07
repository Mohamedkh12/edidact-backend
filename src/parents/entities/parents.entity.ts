import { Column, Entity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Children } from '../../childs/entities/childs.entity';
import { Back_pack } from '../../back-pack/entities/back_pack.entity';
import { Codes } from '../../mail/PasswordRestCode/entite/Codes.entity';

@Entity('parents')
export class Parents extends User {
  @Column({ type: 'integer' })
  tel: number;
  @OneToMany(() => Children, (Children) => Children.parents, { cascade: true })
  childs: Children[];

  @OneToMany(() => Back_pack, (backpack) => backpack.parent)
  backpacks: Back_pack[];

  @OneToMany(() => Codes, (code) => code.parent)
  codes: Codes[];
}

export { Children };
