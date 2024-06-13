import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Superhero } from './superhero.entity';

@Entity({ schema: 'superhero' })
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  race: string;

  @OneToMany(() => Superhero, (superhero) => superhero.race)
  superheroes: Superhero[];
}
