import { Station } from '../../station/entities/station.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  TreeParent,
  Entity,
  Tree,
  TreeChildren,
} from 'typeorm';

@Entity('companies')
@Tree('closure-table', {
  closureTableName: 'company',
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

  @OneToMany(() => Station, (station) => station.company, {
    onDelete: 'CASCADE',
  })
  stations: Station[];
}
