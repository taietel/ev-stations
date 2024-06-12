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
  AfterInsert,
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

  @TreeChildren()
  children: Company[];

  @TreeParent()
  parent_company: Company;

  @OneToMany(() => Station, (station) => station.company)
  stations: Station[];
}
