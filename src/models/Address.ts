import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adreses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column()
  latitude: number;

  @Column()
  longitude: number;
}

export default Address;
