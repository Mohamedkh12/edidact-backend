import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Children } from '../../childs/entities/childs.entity';
import { Back_pack } from '../../back-pack/entities/back_pack.entity';

@Entity('parents')
export class Parents extends User {
  @PrimaryColumn({ type: 'integer' })
  id: number;
  @Column({ type: 'integer' })
  tel: number;

  @OneToMany(() => Children, (Children) => Children.parents, { cascade: true })
  childs: Children[];

  @OneToMany(() => Back_pack, (backpack) => backpack.parent)
  backpacks: Back_pack[];

  constructor(username: string, email: string, password: string, tel: number) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
    this.tel = tel;
  }
}

export { Children };
