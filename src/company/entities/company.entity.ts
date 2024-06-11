import { Station } from '../../station/entities/station.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  TreeParent,
  Entity,
  Tree,
  TreeChildren,
} from 'typeorm';

@Entity('companies')
@Tree('closure-table', {
  closureTableName: 'company_closure',
  ancestorColumnName: (column) => 'ancestor_' + column.propertyName,
  descendantColumnName: (column) => 'descendant_' + column.propertyName,
})
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;

  @TreeChildren()
  children: Company[];

  @TreeParent()
  parent: Company;

  @OneToMany(() => Station, (station) => station.company)
  stations: Station[];

  // constructor(partial: Partial<Company>) {
  //   Object.assign(this, partial);
  // }
}
