import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @Column()
  route: string;

  @Column()
  sublocality: string;

  @Column()
  locality: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column("decimal", {precision: 9, scale: 6})
  latitude: number;

  @Column("decimal", {precision: 9, scale: 6})
  longitude: number;

}

export default Address;
