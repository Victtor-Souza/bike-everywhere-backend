import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('occurrence_type')
class OccurenceType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;
}

export default OccurenceType;
