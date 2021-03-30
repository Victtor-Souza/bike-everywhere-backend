import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bike_type')
class BikeType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;
}

export default BikeType;
