import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import BikeType from './BikeType';
import User from './User';

@Entity('bicycles')
class Bike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  serial_number: string;

  @Column()
  bike_type_id: string;

  @OneToOne(() => BikeType)
  @JoinColumn({ name: 'bike_type_id' })
  bike_type: BikeType;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Bike;
