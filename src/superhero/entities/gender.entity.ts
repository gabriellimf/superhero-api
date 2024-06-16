import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Superhero } from './superhero.entity';

@Entity({ schema: 'superhero' })
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  gender: string;

  @OneToMany(() => Superhero, (superhero) => superhero.gender, { onDelete: 'CASCADE' })
  superheroes: Superhero[];
}
