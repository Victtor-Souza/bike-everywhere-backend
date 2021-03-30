import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Address from './Address';
import Bike from './Bike';
import OccurenceType from './OccurenceType';

@Entity('occurrences')
class Occurrence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ocurence_type_id: string;

  @OneToOne(() => OccurenceType)
  @JoinColumn({ name: 'ocurence_type_id' })
  ocurrence_type: OccurenceType;

  @Column()
  bike_id: string;

  @OneToOne(() => Bike)
  @JoinColumn({ name: 'bike_id' })
  bike: Bike;

  @Column()
  datetime: Date;

  @Column()
  description: string;

  @Column()
  address_id: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Bike;
}

export default Occurrence;
