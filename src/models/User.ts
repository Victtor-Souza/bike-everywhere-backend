import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  family_name: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  cell_phone: string;

  @Column()
  password: string;

  getFullName(): string {
    return `${this.name} ${this.family_name}`;
  }
}

export default User;
