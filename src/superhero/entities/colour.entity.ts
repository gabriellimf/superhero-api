import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Superhero } from './superhero.entity';

@Entity({ schema: 'superhero' })
export class Colour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  colour: string;

  @OneToMany(() => Superhero, (superhero) => superhero.eye_colour)
  superheroes: Superhero[];
}
