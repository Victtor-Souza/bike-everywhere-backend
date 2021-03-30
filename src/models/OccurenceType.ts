import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('occurrence_bike')
class OccurenceType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;
}

export default OccurenceType;
