import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Point,
  Index,
  VirtualColumn,
} from 'typeorm';

import { Company } from '../../company/entities/company.entity';

@Entity('stations')
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
  })
  geometry: Point;

  @ManyToOne(() => Company, (company) => company.stations, { eager: true })
  company: Company;

  @Column()
  address: string;

  @Column()
  status: string;

  // not sure if is needed, but it's nice to have it in response
  @VirtualColumn({
    query: (alias) =>
      `SELECT distance from (values(‘distance’)) s(${alias}.distance)`,
  })
  distance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(partial: Station) {
    Object.assign(this, partial);
  }
}
