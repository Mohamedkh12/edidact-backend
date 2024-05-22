import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Parents } from '../../parents/entities/parents.entity';
import { Back_pack } from '../../back-pack/entities/back_pack.entity';
@Entity('Children')
export class Children extends User {
  @Column({ type: 'text' })
  classe: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @ManyToOne(() => Parents, (parents) => parents.childs)
  @JoinColumn({ name: 'id_parent' })
  parents: Parents;

  @OneToOne(() => Back_pack, (backpack) => backpack.child)
  backpack: Back_pack;
}